declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    gtag_report_conversion?: (url?: string) => boolean;
  }
}

export function trackWhatsAppConversion() {
  window.gtag_report_conversion?.();
}

export const whatsappConversionHandlers = {
  onClick: trackWhatsAppConversion,
  onAuxClick: trackWhatsAppConversion,
};
