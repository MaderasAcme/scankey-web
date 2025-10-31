import React from "react";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

export default function ConfidenceMeter({ confidence }) {
  const percentage = Math.round(confidence * 100);
  
  let status = "low";
  let icon = XCircle;
  let color = "text-red-600";
  let bgColor = "bg-red-50";
  let borderColor = "border-red-100";
  let message = "Confianza Baja";

  if (confidence >= 0.95) {
    status = "high";
    icon = CheckCircle2;
    color = "text-green-600";
    bgColor = "bg-green-50";
    borderColor = "border-green-100";
    message = "Alta Confianza";
  } else if (confidence >= 0.60) {
    status = "medium";
    icon = AlertTriangle;
    color = "text-orange-600";
    bgColor = "bg-orange-50";
    borderColor = "border-orange-100";
    message = "Confianza Media";
  }

  const Icon = icon;

  return (
    <div className={`${bgColor} ${borderColor} border-2 rounded-3xl p-8`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className={`w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm`}>
            <Icon className={`w-8 h-8 ${color}`} strokeWidth={2.5} />
          </div>
          <div>
            <h3 className={`font-bold text-2xl ${color}`}>{message}</h3>
            <p className="text-gray-600 mt-1">Nivel de certeza del análisis</p>
          </div>
        </div>
        <div className={`text-5xl font-bold ${color}`}>
          {percentage}%
        </div>
      </div>
      <Progress value={percentage} className="h-3 rounded-full" />
    </div>
  );
}