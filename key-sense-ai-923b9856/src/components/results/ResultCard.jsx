import React from "react";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal } from "lucide-react";

export default function ResultCard({ rank, brand, model, confidence, explanation, isTopMatch }) {
  const percentage = Math.round(confidence * 100);

  return (
    <div className={`${isTopMatch ? 'bg-black text-white' : 'bg-gray-50 border-2 border-gray-100'} rounded-3xl p-8 transition-all hover:shadow-xl`}>
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          {rank === 1 && (
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-500/30">
              <Trophy className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
          )}
          {rank === 2 && (
            <div className="w-12 h-12 bg-gradient-to-br from-gray-300 to-gray-400 rounded-2xl flex items-center justify-center shadow-lg">
              <Medal className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
          )}
          {rank === 3 && (
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30">
              <Medal className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
          )}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h3 className={`text-2xl font-bold ${isTopMatch ? 'text-white' : 'text-black'}`}>{brand}</h3>
              {isTopMatch && (
                <Badge className="bg-white/20 text-white border-white/30 px-3 py-1 rounded-full font-semibold hover:bg-white/20">
                  Top Match
                </Badge>
              )}
            </div>
            <p className={`text-lg ${isTopMatch ? 'text-white/70' : 'text-gray-600'}`}>{model}</p>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-4xl font-bold ${isTopMatch ? 'text-white' : 'text-black'}`}>{percentage}%</div>
          <p className={`text-sm ${isTopMatch ? 'text-white/50' : 'text-gray-500'} font-medium`}>confianza</p>
        </div>
      </div>

      <div className={`${isTopMatch ? 'bg-white/10' : 'bg-white border-2 border-gray-100'} rounded-2xl p-5`}>
        <p className={`text-sm leading-relaxed ${isTopMatch ? 'text-white/80' : 'text-gray-700'}`}>{explanation}</p>
      </div>
    </div>
  );
}