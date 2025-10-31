import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { History as HistoryIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import HistoryCard from "../components/history/HistoryCard";

export default function History() {
  const navigate = useNavigate();
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHistory = async () => {
      const data = await base44.entities.Scan.list("-created_date", 50);
      setScans(data);
      setLoading(false);
    };

    loadHistory();
  }, []);

  const handleDelete = async (scanId) => {
    await base44.entities.Scan.delete(scanId);
    setScans(scans.filter(s => s.id !== scanId));
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-black tracking-tight mb-2">Historial</h1>
        <p className="text-gray-500 text-lg">Tus últimos escaneos y resultados</p>
      </div>

      {loading ? (
        <div className="grid gap-5">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-gray-50 rounded-3xl p-6 border border-gray-100 animate-pulse">
              <div className="flex gap-5">
                <div className="w-28 h-28 bg-gray-200 rounded-2xl"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-6 bg-gray-200 rounded-full w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded-full w-1/3"></div>
                  <div className="h-4 bg-gray-200 rounded-full w-1/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : scans.length === 0 ? (
        <div className="bg-gray-50 rounded-3xl p-12 text-center border border-gray-100">
          <HistoryIcon className="w-16 h-16 mx-auto mb-6 text-gray-300" strokeWidth={2} />
          <h3 className="text-2xl font-bold text-black mb-3">No hay historial</h3>
          <p className="text-gray-500 mb-8 text-lg">Aún no has escaneado ninguna llave</p>
          <Button 
            onClick={() => navigate(createPageUrl("Home"))}
            className="h-14 px-8 text-base font-semibold bg-black hover:bg-gray-900 text-white rounded-2xl"
          >
            Escanear Primera Llave
          </Button>
        </div>
      ) : (
        <div className="grid gap-5">
          {scans.map((scan) => (
            <HistoryCard
              key={scan.id}
              scan={scan}
              onDelete={handleDelete}
              onClick={() => navigate(createPageUrl("Results") + `?scanId=${scan.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}