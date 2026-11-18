import { useEffect, useState } from 'react';
import { Check, Copy, ExternalLink, MessageCircle, X } from 'lucide-react';
import { buildWhatsAppUrl } from '../utils/quoteLogic';

interface WhatsAppInquiryModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

export function WhatsAppInquiryModal({ isOpen, message, onClose }: WhatsAppInquiryModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const whatsappUrl = buildWhatsAppUrl(message);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1E1E1E]/60 backdrop-blur-xs p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="whatsapp-modal-title"
    >
      <div className="bg-[#F9F6F0] border border-[#1E1E1E]/15 rounded-lg max-w-xl w-full max-h-[90dvh] flex flex-col shadow-xl overflow-hidden">
        <div className="flex items-center justify-between gap-4 px-5 sm:px-6 py-4 border-b border-[#1E1E1E]/10 bg-white shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <MessageCircle className="w-5 h-5 text-[#5C715E] shrink-0" aria-hidden="true" />
            <h3 id="whatsapp-modal-title" className="font-editorial text-xl sm:text-2xl font-medium text-[#1E1E1E] truncate">
              Ready-to-Send WhatsApp Inquiry
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close WhatsApp inquiry preview"
            className="w-10 h-10 inline-flex items-center justify-center rounded-md text-[#1E1E1E]/70 hover:text-[#1E1E1E] hover:bg-[#F2EDE3] transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1">
          <p className="text-sm text-[#1E1E1E]/75">
            Your custom doorgift specification has been formatted for our bridal concierge. Launch
            WhatsApp directly or copy the summary below.
          </p>

          <pre className="bg-white border border-[#1E1E1E]/12 rounded-md p-4 text-xs sm:text-[13px] leading-relaxed text-[#1E1E1E] whitespace-pre-wrap font-sans max-h-64 sm:max-h-72 overflow-y-auto">
            {message}
          </pre>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[#F9F6F0] bg-[#5C715E] hover:bg-[#475849] transition-colors rounded-md"
            >
              <span>Open in WhatsApp</span>
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[#1E1E1E] bg-white border border-[#1E1E1E]/20 hover:bg-[#F2EDE3] transition-colors rounded-md cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#5C715E]" aria-hidden="true" />
                  <span>Copied Message</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" aria-hidden="true" />
                  <span>Copy Message</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
