import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Star, Navigation } from "lucide-react";

export default function WorkshopCard({ workshop }) {
  const openInMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${workshop.latitude},${workshop.longitude}`;
    window.open(url, "_blank");
  };

  return (
    <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:shadow-xl transition-all">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-2xl font-bold text-black mb-3">{workshop.name}</h3>
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <MapPin className="w-5 h-5" strokeWidth={2.5} />
            <span className="font-medium">{workshop.address}</span>
          </div>
          {workshop.phone && (
            <div className="flex items-center gap-2 text-gray-600">
              <Phone className="w-5 h-5" strokeWidth={2.5} />
              <a href={`tel:${workshop.phone}`} className="text-black font-semibold hover:underline">
                {workshop.phone}
              </a>
            </div>
          )}
        </div>
        {workshop.rating && (
          <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-2xl border-2 border-yellow-200">
            <Star className="w-5 h-5 text-yellow-600 fill-yellow-600" strokeWidth={2.5} />
            <span className="font-bold text-yellow-800 text-lg">{workshop.rating}</span>
          </div>
        )}
      </div>

      {workshop.specialties && workshop.specialties.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {workshop.specialties.map((specialty, index) => (
            <Badge key={index} variant="secondary" className="px-4 py-2 rounded-full font-semibold border-2 border-gray-200 bg-white hover:bg-white">
              {specialty}
            </Badge>
          ))}
        </div>
      )}

      <Button onClick={openInMaps} className="w-full h-14 text-base font-semibold bg-black hover:bg-gray-900 text-white rounded-2xl">
        <Navigation className="w-5 h-5 mr-2" strokeWidth={2.5} />
        Abrir en Mapa
      </Button>
    </div>
  );
}