import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Search } from "lucide-react";
import WorkshopCard from "../components/workshops/WorkshopCard";

export default function Workshops() {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadWorkshops = async () => {
      const data = await base44.entities.Workshop.list();
      setWorkshops(data);
      setLoading(false);
    };

    loadWorkshops();
  }, []);

  const filteredWorkshops = workshops.filter(w =>
    w.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    w.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-black tracking-tight mb-2">Talleres</h1>
        <p className="text-gray-500 text-lg">Encuentra dónde duplicar tu llave</p>
      </div>

      <div className="relative">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={2.5} />
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por nombre o dirección..."
          className="pl-14 h-14 rounded-2xl border-2 border-gray-200 font-medium text-base focus:border-black"
        />
      </div>

      {loading ? (
        <div className="grid gap-5">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-50 rounded-3xl p-6 border border-gray-100 animate-pulse">
              <div className="h-6 bg-gray-200 rounded-full w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded-full w-1/2"></div>
            </div>
          ))}
        </div>
      ) : filteredWorkshops.length === 0 ? (
        <div className="bg-gray-50 rounded-3xl p-12 text-center border border-gray-100">
          <MapPin className="w-16 h-16 mx-auto mb-6 text-gray-300" strokeWidth={2} />
          <h3 className="text-2xl font-bold text-black mb-3">No se encontraron talleres</h3>
          <p className="text-gray-500 text-lg">Intenta con otro término de búsqueda</p>
        </div>
      ) : (
        <div className="grid gap-5">
          {filteredWorkshops.map((workshop) => (
            <WorkshopCard key={workshop.id} workshop={workshop} />
          ))}
        </div>
      )}
    </div>
  );
}