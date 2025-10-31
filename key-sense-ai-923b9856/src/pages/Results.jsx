import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Copy, Edit3, MapPin, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ResultCard from "../components/results/ResultCard";
import ConfidenceMeter from "../components/results/ConfidenceMeter";
import KeyDetails from "../components/results/KeyDetails";

export default function Results() {
  const navigate = useNavigate();
  const [scan, setScan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadScan = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const scanId = urlParams.get("scanId");
      
      if (scanId) {
        const scanData = await base44.entities.Scan.filter({ id: scanId });
        if (scanData[0]) {
          setScan(scanData[0]);
        }
      }
      setLoading(false);
    };

    loadScan();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!scan) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Alert className="border-red-100 bg-red-50 rounded-3xl border-2">
          <AlertTriangle className="h-5 w-5 text-red-600" />
          <AlertDescription className="text-red-800">No se encontró el análisis</AlertDescription>
        </Alert>
      </div>
    );
  }

  const confidence = scan.top1_confidence || 0;
  const isHighConfidence = confidence >= 0.95;
  const isLowConfidence = confidence < 0.60;

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(createPageUrl("Home"))}
          className="rounded-2xl hover:bg-gray-100"
        >
          <ArrowLeft className="w-5 h-5" strokeWidth={2.5} />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-black tracking-tight">Resultados</h1>
          <p className="text-gray-500">Revisa los candidatos identificados</p>
        </div>
      </div>

      {/* Confidence Meter */}
      <ConfidenceMeter confidence={confidence} />

      {/* Warnings */}
      {scan.is_blurry && (
        <Alert className="border-orange-100 bg-orange-50 rounded-3xl border-2">
          <AlertTriangle className="h-5 w-5 text-orange-600" />
          <AlertDescription className="text-orange-800">
            La imagen parece estar borrosa. Considera tomar otra foto con mejor enfoque.
          </AlertDescription>
        </Alert>
      )}

      {isLowConfidence && (
        <Alert className="border-red-100 bg-red-50 rounded-3xl border-2">
          <AlertTriangle className="h-5 w-5 text-red-600" />
          <AlertDescription className="text-red-800">
            Confianza baja. Por favor, revisa los resultados y corrígelos manualmente si es necesario.
          </AlertDescription>
        </Alert>
      )}

      {/* Key Image */}
      <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
        <img
          src={scan.image_url}
          alt="Llave escaneada"
          className="w-full h-80 object-contain rounded-2xl"
        />
      </div>

      {/* Key Details */}
      <KeyDetails scan={scan} />

      {/* Result Cards */}
      <div className="space-y-5">
        <h2 className="text-2xl font-bold text-black">Candidatos principales</h2>
        
        <ResultCard
          rank={1}
          brand="Tesa"
          model="TE5"
          confidence={scan.top1_confidence}
          explanation="Coincide con el perfil de dientes y el cabezal característico de la serie TE de Tesa"
          isTopMatch={true}
        />

        {scan.top2_confidence > 0 && (
          <ResultCard
            rank={2}
            brand="JMA"
            model="JMA-TES-2D"
            confidence={scan.top2_confidence}
            explanation="Compatible con TE5, dentado similar pero cabezal diferente"
          />
        )}

        {scan.top3_confidence > 0 && (
          <ResultCard
            rank={3}
            brand="Kaba"
            model="K-20"
            confidence={scan.top3_confidence}
            explanation="Tipo de llave similar, pero sistema de pines diferente"
          />
        )}
      </div>

      {/* Special Flags */}
      {(scan.patented_detected || scan.high_security_detected) && (
        <Alert className="border-purple-100 bg-purple-50 rounded-3xl border-2">
          <AlertTriangle className="h-5 w-5 text-purple-600" />
          <AlertDescription className="text-purple-800">
            {scan.patented_detected && <p>⚠️ Esta llave parece estar patentada</p>}
            {scan.high_security_detected && <p>🔒 Detectada como llave de alta seguridad</p>}
          </AlertDescription>
        </Alert>
      )}

      {/* Action Buttons */}
      <div className="grid gap-4 pt-4">
        {isHighConfidence && (
          <Button
            size="lg"
            className="h-16 text-lg font-semibold bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-2xl shadow-lg shadow-green-500/20"
          >
            <Copy className="w-5 h-5 mr-3" strokeWidth={2.5} />
            Aceptar y Duplicar
          </Button>
        )}

        <Button
          size="lg"
          variant="outline"
          className="h-16 text-lg font-semibold border-2 border-gray-200 hover:bg-gray-50 text-black rounded-2xl"
          onClick={() => navigate(createPageUrl("ManualCorrection") + `?scanId=${scan.id}`)}
        >
          <Edit3 className="w-5 h-5 mr-3" strokeWidth={2.5} />
          Corregir Manualmente
        </Button>

        <Button
          size="lg"
          variant="outline"
          className="h-16 text-lg font-semibold border-2 border-gray-200 hover:bg-gray-50 text-black rounded-2xl"
          onClick={() => navigate(createPageUrl("Workshops"))}
        >
          <MapPin className="w-5 h-5 mr-3" strokeWidth={2.5} />
          Ver Talleres Cercanos
        </Button>
      </div>
    </div>
  );
}