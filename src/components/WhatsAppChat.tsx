import { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

interface WhatsAppChatProps {
  phoneNumber: string;
  message?: string;
  position?: 'bottom-right' | 'bottom-left';
}

export function WhatsAppChat({
  phoneNumber,
  message = 'Hi! I\'m interested in learning more about your programs.',
  position = 'bottom-right',
}: WhatsAppChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);

    const hideTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 8000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  const handleOpenChat = () => {
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  };

  const positionClasses = {
    'bottom-right': 'right-4 lg:right-8',
    'bottom-left': 'left-4 lg:left-8',
  };

  return (
    <div className={`fixed bottom-4 lg:bottom-8 ${positionClasses[position]} z-50 flex flex-col items-end gap-3`}>
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl p-5 w-72 mb-2 animate-in fade-in slide-in-from-bottom-4 duration-300 border border-gray-100">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h4 className="font-display text-lg text-ink">Chat with us</h4>
              <p className="text-sm text-gray-500">We typically reply within minutes</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={18} className="text-gray-500" />
            </button>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 mb-4">
            <p className="text-sm text-gray-700">{message}</p>
          </div>
          <button
            onClick={handleOpenChat}
            className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            <MessageCircle size={20} />
            Start Chat
          </button>
        </div>
      )}

      {showTooltip && !isOpen && (
        <div className="bg-white rounded-xl shadow-lg p-3 mb-2 animate-in fade-in slide-in-from-bottom-2 duration-300 border border-gray-100 max-w-[200px]">
          <p className="text-sm text-gray-700 font-medium">Need help? Chat with us on WhatsApp!</p>
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute -top-1 -right-1 p-1 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X size={12} className="text-gray-500" />
          </button>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
        aria-label="Open WhatsApp chat"
      >
        {isOpen ? (
          <X size={28} />
        ) : (
          <MessageCircle size={28} className="group-hover:scale-110 transition-transform duration-300" />
        )}
      </button>
    </div>
  );
}
