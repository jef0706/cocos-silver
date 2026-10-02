import Formulario from '../components/Formulario';

function Contacto() {
  return (
    <main className="contacto">
      <section className="contacto__encabezado">
        <span className="hero__etiqueta">Estamos para ayudarte</span>
        <h1>Solicita una cotización</h1>
        <p>
          ¿Te interesa alguna de nuestras joyas? Cuéntanos qué pieza buscas y
          prepararemos tu consulta para enviarla por WhatsApp.
        </p>
      </section>

      <section className="contacto__contenedor">
        <div className="contacto__info">
          <h2>Cocos Silver</h2>
          <p>💎 Joyería elegante para cada momento especial.</p>
          <p>📍 Guatemala</p>

          <p>
            📧{' '}
            <a href="mailto:destello98izabel@gmail.com">
              destello98izabel@gmail.com
            </a>
          </p>

          <p>
            📱{' '}
            <a
              href="https://wa.me/50236304575"
              target="_blank"
              rel="noopener noreferrer"
            >
              3630-4575
            </a>
          </p>
        </div>

        <Formulario />
      </section>
    </main>
  );
}

export default Contacto;