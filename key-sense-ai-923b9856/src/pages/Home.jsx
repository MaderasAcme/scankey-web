import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Camera, Upload, AlertCircle, Zap, Shield, Target } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import CameraCapture from "../components/scan/CameraCapture";
import ScanGuide from "../components/scan/ScanGuide";

export default function Home() {
  const navigate = useNavigate();
  const [showCamera, setShowCamera] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const analyzeKey = async (file) => {
    setAnalyzing(true);
    setError(null);
    
    try {
      const startTime = Date.now();
      
      const { file_url } = await base44.integrations.Core.UploadFile({ file });

      const analysis = await base44.integrations.Core.InvokeLLM({
        prompt: `Analiza esta imagen de una llave y proporciona:
        1. Tipo de llave (plana/gorja/tubular/dimple/cruciforme/automocion/seguridad)
        2. Marca probable (Tesa, JMA, Yale, Kaba, Mul-T-Lock, etc.)
        3. Modelo específico si es posible
        4. Orientación (izquierda/derecha/simetrica)
        5. Texto visible en el cabezal (OCR)
        6. Color del cabezal
        7. Estado visual (buena/desgastada/oxidada)
        8. Si la imagen está borrosa
        9. Si parece ser patentada o de alta seguridad
        10. 3 candidatos de modelos posibles con nivel de confianza (0-1)
        11. Explicación breve de por qué cada candidato
        
        Sé preciso y usa los nombres reales de marcas y modelos de llaves.`,
        file_urls: [file_url],
        response_json_schema: {
          type: "object",
          properties: {
            detected_type: { type: "string" },
            detected_orientation: { type: "string" },
            ocr_text: { type: "string" },
            head_color: { type: "string" },
            visual_state: { type: "string" },
            is_blurry: { type: "boolean" },
            patented_detected: { type: "boolean" },
            high_security_detected: { type: "boolean" },
            candidates: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  brand: { type: "string" },
                  model: { type: "string" },
                  confidence: { type: "number" },
                  explanation: { type: "string" }
                }
              }
            },
            general_explanation: { type: "string" }
          }
        }
      });

      const processingTime = Date.now() - startTime;

      const scanData = {
        image_url: file_url,
        device_info: navigator.userAgent,
        detected_type: analysis.detected_type,
        detected_orientation: analysis.detected_orientation,
        ocr_text: analysis.ocr_text,
        head_color: analysis.head_color,
        visual_state: analysis.visual_state,
        is_blurry: analysis.is_blurry,
        patented_detected: analysis.patented_detected,
        high_security_detected: analysis.high_security_detected,
        processing_time: processingTime,
        explanation: analysis.general_explanation,
        top1_confidence: analysis.candidates[0]?.confidence || 0,
        top2_confidence: analysis.candidates[1]?.confidence || 0,
        top3_confidence: analysis.candidates[2]?.confidence || 0
      };

      const scan = await base44.entities.Scan.create(scanData);
      navigate(createPageUrl("Results") + `?scanId=${scan.id}`);

    } catch (err) {
      console.error("Error analyzing key:", err);
      setError("Error al analizar la llave. Por favor, intenta de nuevo con mejor iluminación.");
    } finally {
      setAnalyzing(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      analyzeKey(file);
    }
  };

  const handleCameraCapture = (file) => {
    setShowCamera(false);
    analyzeKey(file);
  };

  if (showCamera) {
    return (
      <CameraCapture
        onCapture={handleCameraCapture}
        onClose={() => setShowCamera(false)}
      />
    );
  }

  if (analyzing) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center max-w-sm">
          <div className="w-24 h-24 mx-auto mb-8 relative">
            <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-black rounded-full border-t-transparent animate-spin"></div>
          </div>
          <h2 className="text-2xl font-bold text-black mb-3">Analizando tu llave</h2>
          <p className="text-gray-500 mb-8">Esto tomará solo unos segundos</p>
          <div className="space-y-3 text-left">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
              <span>Procesando imagen</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600" style={{animationDelay: '0.2s'}}>
              <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
              <span>Identificando tipo y marca</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600" style={{animationDelay: '0.4s'}}>
              <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
              <span>Buscando coincidencias</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12 space-y-10">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold text-black tracking-tight leading-tight">
          Identifica tu llave<br/>al instante
        </h1>
        <p className="text-xl text-gray-500">
          Toma una foto y descubre marca, modelo<br/>y dónde duplicarla
        </p>
      </div>

      {/* Scan Guide */}
      <ScanGuide />

      {/* Error Alert */}
      {error && (
        <Alert className="border-red-100 bg-red-50 rounded-3xl border-2">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <AlertDescription className="text-red-800">{error}</AlertDescription>
        </Alert>
      )}

      {/* Action Buttons */}
      <div className="space-y-4">
        <Button
          onClick={() => setShowCamera(true)}
          size="lg"
          className="w-full h-16 text-lg font-semibold bg-black hover:bg-gray-900 text-white rounded-2xl shadow-lg shadow-black/10"
        >
          <Camera className="w-6 h-6 mr-3" strokeWidth={2.5} />
          Tomar Foto
        </Button>

        <Button
          onClick={() => fileInputRef.current?.click()}
          size="lg"
          variant="outline"
          className="w-full h-16 text-lg font-semibold border-2 border-gray-200 hover:bg-gray-50 text-black rounded-2xl"
        >
          <Upload className="w-6 h-6 mr-3" strokeWidth={2.5} />
          Subir desde Galería
        </Button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileSelect}
        />
      </div>

      {/* Features */}
      <div className="grid grid-cols-3 gap-4 pt-8">
        <div className="text-center space-y-3">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-blue-500/30">
            <Target className="w-7 h-7 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="font-semibold text-black text-sm">Preciso</h3>
            <p className="text-xs text-gray-500 mt-1">Alta precisión en identificación</p>
          </div>
        </div>

        <div className="text-center space-y-3">
          <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-purple-500/30">
            <Zap className="w-7 h-7 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="font-semibold text-black text-sm">Rápido</h3>
            <p className="text-xs text-gray-500 mt-1">Resultados en segundos</p>
          </div>
        </div>

        <div className="text-center space-y-3">
          <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-green-500/30">
            <Shield className="w-7 h-7 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="font-semibold text-black text-sm">Seguro</h3>
            <p className="text-xs text-gray-500 mt-1">Datos protegidos</p>
          </div>
        </div>
      </div>
    </div>
  );
}