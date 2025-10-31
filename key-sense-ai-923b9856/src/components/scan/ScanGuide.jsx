import React from "react";
import { Camera, Sun, Focus } from "lucide-react";

export default function ScanGuide() {
  const tips = [
    {
      icon: Camera,
      title: "Posición clara",
      description: "Fondo liso y uniforme"
    },
    {
      icon: Sun,
      title: "Buena luz",
      description: "Evita sombras y reflejos"
    },
    {
      icon: Focus,
      title: "Imagen nítida",
      description: "Enfoque preciso"
    }
  ];

  return (
    <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
      <h3 className="font-semibold text-black mb-6 text-lg">Tips para mejores resultados</h3>
      <div className="grid grid-cols-3 gap-4">
        {tips.map((tip) => (
          <div key={tip.title} className="text-center space-y-3">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm">
              <tip.icon className="w-6 h-6 text-black" strokeWidth={2.5} />
            </div>
            <div>
              <p className="font-semibold text-black text-sm">{tip.title}</p>
              <p className="text-xs text-gray-500 mt-1">{tip.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}