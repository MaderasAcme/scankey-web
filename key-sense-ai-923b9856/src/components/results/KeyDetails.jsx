import React from "react";
import { Badge } from "@/components/ui/badge";
import { Key, Compass, Type, Palette, Shield, AlertTriangle } from "lucide-react";

export default function KeyDetails({ scan }) {
  return (
    <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 space-y-6">
      <h3 className="font-bold text-xl text-black">Detalles detectados</h3>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
            <Key className="w-6 h-6 text-blue-600" strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Tipo</p>
            <p className="font-semibold text-black capitalize text-lg">{scan.detected_type}</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center flex-shrink-0">
            <Compass className="w-6 h-6 text-purple-600" strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Orientación</p>
            <p className="font-semibold text-black capitalize text-lg">{scan.detected_orientation}</p>
          </div>
        </div>

        {scan.ocr_text && (
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Type className="w-6 h-6 text-green-600" strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Texto OCR</p>
              <p className="font-semibold text-black text-lg">{scan.ocr_text}</p>
            </div>
          </div>
        )}

        {scan.head_color && (
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Palette className="w-6 h-6 text-orange-600" strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Color Cabezal</p>
              <p className="font-semibold text-black capitalize text-lg">{scan.head_color}</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-3 pt-4">
        {scan.visual_state && (
          <Badge variant="outline" className="capitalize px-4 py-2 rounded-full font-semibold border-2">
            Estado: {scan.visual_state}
          </Badge>
        )}
        {scan.patented_detected && (
          <Badge className="bg-yellow-100 text-yellow-800 border-2 border-yellow-200 px-4 py-2 rounded-full font-semibold hover:bg-yellow-100">
            <Shield className="w-4 h-4 mr-2" strokeWidth={2.5} />
            Patentada
          </Badge>
        )}
        {scan.high_security_detected && (
          <Badge className="bg-red-100 text-red-800 border-2 border-red-200 px-4 py-2 rounded-full font-semibold hover:bg-red-100">
            <Shield className="w-4 h-4 mr-2" strokeWidth={2.5} />
            Alta Seguridad
          </Badge>
        )}
        {scan.is_blurry && (
          <Badge variant="outline" className="border-2 border-orange-200 text-orange-700 px-4 py-2 rounded-full font-semibold">
            <AlertTriangle className="w-4 h-4 mr-2" strokeWidth={2.5} />
            Imagen borrosa
          </Badge>
        )}
      </div>
    </div>
  );
}