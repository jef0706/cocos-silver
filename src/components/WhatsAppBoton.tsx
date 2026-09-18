import { FaWhatsapp } from 'react-icons/fa';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function WhatsAppBoton() {
  const mensaje = encodeURIComponent(
    'Hola, quiero información sobre las joyas de Cocos Silver.'
  );

  const enlaceWhatsApp = `https://wa.me/50236304575?text=${mensaje}`;

  const registrarClicWhatsApp = () => {
    window.gtag?.('event', 'whatsapp_click', {
      event_category: 'contacto',
      event_label: 'Botón flotante de WhatsApp',
    });
  };

  return (
    <a
      href={enlaceWhatsApp}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-flotante"
      aria-label="Contactar a Cocos Silver por WhatsApp"
      title="Escríbenos por WhatsApp"
      onClick={registrarClicWhatsApp}
    >
      <FaWhatsapp aria-hidden="true" />
    </a>
  );
}

export default WhatsAppBoton;