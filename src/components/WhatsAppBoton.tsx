function WhatsAppBoton() {
  const mensaje = encodeURIComponent(
    'Hola, quiero información sobre las joyas de Cocos Silver.'
  );

  const enlaceWhatsApp = `https://wa.me/50236304575?text=${mensaje}`;

  return (
    <a
      href={enlaceWhatsApp}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-flotante"
      aria-label="Contactar a Cocos Silver por WhatsApp"
      title="Escríbenos por WhatsApp"
    >
      ☎
    </a>
  );
}

export default WhatsAppBoton;
