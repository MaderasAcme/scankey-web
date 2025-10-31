import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ChevronRight, Trash2 } from "lucide-react";

export default function HistoryCard({ scan, onDelete, onClick }) {
  const percentage = Math.round(scan.top1_confidence * 100);

  return (
    <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 hover:shadow-xl transition-all cursor-pointer" onClick={onClick}>
      <div className="flex gap-5">
        <img
          src={scan.image_url}
          alt="Llave"
          className="w-28 h-28 object-cover rounded-2xl flex-shrink-0 border-2 border-gray-200"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-bold text-black capitalize text-xl">{scan.detected_type}</h3>
              <p className="text-gray-500 font-medium">
                {format(new Date(scan.created_date), "PPP", { locale: es })}
              </p>
            </div>
            <Badge className={`${percentage >= 95 ? 'bg-green-100 text-green-800 border-2 border-green-200' : percentage >= 60 ? 'bg-orange-100 text-orange-800 border-2 border-orange-200' : 'bg-red-100 text-red-800 border-2 border-red-200'} px-4 py-2 rounded-full font-bold hover:${percentage >= 95 ? 'bg-green-100' : percentage >= 60 ? 'bg-orange-100' : 'bg-red-100'}`}>
              {percentage}%
            </Badge>
          </div>

          {scan.ocr_text && (
            <p className="text-sm text-gray-600 mb-3 font-medium">OCR: {scan.ocr_text}</p>
          )}

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {scan.patented_detected && (
                <Badge variant="outline" className="text-xs border-2 rounded-full px-3 py-1 font-semibold">Patentada</Badge>
              )}
              {scan.high_security_detected && (
                <Badge variant="outline" className="text-xs border-2 rounded-full px-3 py-1 font-semibold">Alta Seguridad</Badge>
              )}
            </div>
            
            <div className="flex gap-2 items-center">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-2xl hover:bg-red-50"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(scan.id);
                }}
              >
                <Trash2 className="w-5 h-5 text-red-600" strokeWidth={2.5} />
              </Button>
              <ChevronRight className="w-6 h-6 text-gray-400" strokeWidth={2.5} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}