import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function ManualCorrection() {
  const navigate = useNavigate();
  const [scan, setScan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  
  const [formData, setFormData] = useState({
    correct_brand: "",
    correct_model: "",
    correct_type: "",
    correct_orientation: "",
    correct_ocr_text: "",
    reason: ""
  });

  useEffect(() => {
    const loadScan = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const scanId = urlParams.get("scanId");
      
      if (scanId) {
        const scanData = await base44.entities.Scan.filter({ id: scanId });
        if (scanData[0]) {
          setScan(scanData[0]);
          setFormData({
            correct_brand: "",
            correct_model: "",
            correct_type: scanData[0].detected_type || "",
            correct_orientation: scanData[0].detected_orientation || "",
            correct_ocr_text: scanData[0].ocr_text || "",
            reason: ""
          });
        }
      }
      setLoading(false);
    };

    loadScan();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await base44.entities.ManualCorrection.create({
        scan_id: scan.id,
        ...formData
      });
      
      setSaved(true);
      setTimeout(() => {
        navigate(createPageUrl("History"));
      }, 2000);
    } catch (error) {
      console.error("Error saving correction:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (saved) {
    return (
      <div className="max-w-2xl mx-auto p-4 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">¡Corrección Guardada!</h2>
          <p className="text-slate-600">Gracias por ayudarnos a mejorar</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Corrección Manual</h1>
          <p className="text-slate-600">Ayúdanos a mejorar el sistema</p>
        </div>
      </div>

      {scan && (
        <div className="bg-white rounded-xl p-4 border border-slate-200">
          <img
            src={scan.image_url}
            alt="Llave"
            className="w-full h-48 object-contain rounded-lg mb-4"
          />
          <div className="text-sm text-slate-600">
            <p>Análisis original: {scan.detected_type}</p>
            {scan.ocr_text && <p>OCR detectado: {scan.ocr_text}</p>}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="brand">Marca Correcta *</Label>
            <Input
              id="brand"
              value={formData.correct_brand}
              onChange={(e) => setFormData({ ...formData, correct_brand: e.target.value })}
              placeholder="Ej: Tesa, JMA, Yale..."
              required
            />
          </div>

          <div>
            <Label htmlFor="model">Modelo Correcto *</Label>
            <Input
              id="model"
              value={formData.correct_model}
              onChange={(e) => setFormData({ ...formData, correct_model: e.target.value })}
              placeholder="Ej: TE5, K-20..."
              required
            />
          </div>

          <div>
            <Label htmlFor="type">Tipo de Llave *</Label>
            <Select
              value={formData.correct_type}
              onValueChange={(value) => setFormData({ ...formData, correct_type: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="plana">Plana</SelectItem>
                <SelectItem value="gorja">Gorja</SelectItem>
                <SelectItem value="tubular">Tubular</SelectItem>
                <SelectItem value="dimple">Dimple</SelectItem>
                <SelectItem value="cruciforme">Cruciforme</SelectItem>
                <SelectItem value="automocion">Automoción</SelectItem>
                <SelectItem value="seguridad">Seguridad</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="orientation">Orientación *</Label>
            <Select
              value={formData.correct_orientation}
              onValueChange={(value) => setFormData({ ...formData, correct_orientation: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona orientación" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="izquierda">Izquierda</SelectItem>
                <SelectItem value="derecha">Derecha</SelectItem>
                <SelectItem value="simetrica">Simétrica</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="ocr">Texto en el Cabezal</Label>
            <Input
              id="ocr"
              value={formData.correct_ocr_text}
              onChange={(e) => setFormData({ ...formData, correct_ocr_text: e.target.value })}
              placeholder="Texto visible en la llave"
            />
          </div>

          <div>
            <Label htmlFor="reason">Motivo de la Corrección</Label>
            <Textarea
              id="reason"
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              placeholder="¿Por qué el análisis fue incorrecto?"
              rows={3}
            />
          </div>
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-blue-700"
          disabled={saving}
        >
          {saving ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Guardando...
            </>
          ) : (
            <>
              <Save className="w-5 h-5 mr-2" />
              Enviar Corrección
            </>
          )}
        </Button>
      </form>
    </div>
  );
}