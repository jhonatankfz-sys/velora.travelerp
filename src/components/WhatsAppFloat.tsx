import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { buildGeneralContactWhatsAppUrl } from '../utils/whatsapp';

interface WhatsAppFloatProps {
  whatsappNumber: string;
  whatsappDisplay: string;
}

export const WhatsAppFloat: React.FC<WhatsAppFloatProps> = ({
  whatsappNumber,
  whatsappDisplay,
}) => {
  const [showTooltip, setShowTooltip] = useState(true);

  const handleClick = () => {
    const url = buildGeneralContactWhatsAppUrl(whatsappNumber);
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Tooltip bubble */}
      {showTooltip && (
        <div className="mb-2 mr-1 bg-white text-velora-950 px-4 py-2.5 rounded-2xl shadow-card-3d border border-sand-200 text-xs flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300 max-w-xs">
          <div>
            <span className="font-extrabold block text-emerald-700">¿Dudas sobre tu ruta?</span>
            <span className="text-[11px] text-velora-700">
              Escríbenos directamente a WhatsApp ({whatsappDisplay})
            </span>
          </div>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-velora-400 hover:text-velora-700 p-1"
            title="Cerrar aviso"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={handleClick}
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-emerald-300"
        aria-label="Abrir chat de WhatsApp de VELORA"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-white animate-ping" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-white" />
        <MessageCircle className="w-7 h-7 fill-white" />
      </button>
    </div>
  );
};
