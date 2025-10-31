
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Home, ScanLine, History, MapPin, Settings as SettingsIcon } from "lucide-react";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  const navItems = [
    { name: "Home", icon: Home, url: createPageUrl("Home") },
    { name: "Historial", icon: History, url: createPageUrl("History") },
    { name: "Talleres", icon: MapPin, url: createPageUrl("Workshops") },
    { name: "Ajustes", icon: SettingsIcon, url: createPageUrl("Settings") },
  ];

  const isActive = (url) => location.pathname === url;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        :root {
          --revolut-blue: #0075FF;
          --revolut-dark: #0A0D14;
          --revolut-gray: #F5F5F7;
        }
      `}</style>

      {/* Header */}
      <header className="bg-white sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to={createPageUrl("Home")} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black rounded-2xl flex items-center justify-center">
                <ScanLine className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-black tracking-tight">Scankey</h1>
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-24">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 backdrop-blur-xl bg-white/80">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-around items-center py-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.url}
                className={`flex flex-col items-center gap-1 px-6 py-3 rounded-2xl transition-all ${
                  isActive(item.url)
                    ? "text-black bg-gray-50"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <item.icon className="w-6 h-6" strokeWidth={isActive(item.url) ? 2.5 : 2} />
                <span className="text-[10px] font-semibold tracking-wide">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
