import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, Shield, Info, LogOut, Mail, User } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Settings() {
  const [settings, setSettings] = useState({
    notifications: true,
    saveHistory: true,
    shareData: false
  });

  const handleLogout = () => {
    base44.auth.logout();
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-black tracking-tight mb-2">Ajustes</h1>
        <p className="text-gray-500 text-lg">Configura tu experiencia</p>
      </div>

      {/* Profile Section */}
      <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 space-y-4">
        <h2 className="text-xl font-bold text-black flex items-center gap-3">
          <div className="w-10 h-10 bg-black rounded-2xl flex items-center justify-center">
            <User className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          Perfil
        </h2>
        <div className="space-y-3 text-gray-600 ml-13">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5" strokeWidth={2.5} />
            <span className="font-medium">usuario@ejemplo.com</span>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 space-y-6">
        <h2 className="text-xl font-bold text-black flex items-center gap-3">
          <div className="w-10 h-10 bg-black rounded-2xl flex items-center justify-center">
            <Bell className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          Notificaciones
        </h2>
        <div className="flex items-center justify-between">
          <Label htmlFor="notifications" className="text-black font-semibold text-base">
            Recibir notificaciones
          </Label>
          <Switch
            id="notifications"
            checked={settings.notifications}
            onCheckedChange={(checked) => setSettings({ ...settings, notifications: checked })}
          />
        </div>
      </div>

      {/* Privacy */}
      <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 space-y-6">
        <h2 className="text-xl font-bold text-black flex items-center gap-3">
          <div className="w-10 h-10 bg-black rounded-2xl flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          Privacidad
        </h2>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="history" className="text-black font-semibold text-base">
              Guardar historial
            </Label>
            <Switch
              id="history"
              checked={settings.saveHistory}
              onCheckedChange={(checked) => setSettings({ ...settings, saveHistory: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="share" className="text-black font-semibold text-base">
              Compartir datos para mejorar IA
            </Label>
            <Switch
              id="share"
              checked={settings.shareData}
              onCheckedChange={(checked) => setSettings({ ...settings, shareData: checked })}
            />
          </div>
        </div>

        <Alert className="bg-blue-50 border-2 border-blue-100 rounded-2xl">
          <Info className="h-5 w-5 text-blue-600" strokeWidth={2.5} />
          <AlertDescription className="text-blue-800 font-medium">
            Tus datos se usan únicamente para mejorar la precisión del sistema. 
            Puedes desactivar esta opción en cualquier momento.
          </AlertDescription>
        </Alert>
      </div>

      {/* About */}
      <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 space-y-2">
        <h2 className="text-xl font-bold text-black">Acerca de</h2>
        <p className="text-gray-600 font-medium">Versión 1.0.0</p>
        <p className="text-gray-600 font-medium">© 2024 KeyScan</p>
      </div>

      {/* Logout */}
      <Button
        onClick={handleLogout}
        variant="outline"
        className="w-full h-14 text-red-600 border-2 border-red-200 hover:bg-red-50 rounded-2xl font-semibold text-base"
      >
        <LogOut className="w-5 h-5 mr-2" strokeWidth={2.5} />
        Cerrar Sesión
      </Button>
    </div>
  );
}