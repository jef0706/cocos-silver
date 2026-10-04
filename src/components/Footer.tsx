import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div>
        <h2>💎 Cocos Silver</h2>
        <p>Elegancia que permanece.</p>
        <p>Guatemala</p>
      </div>

      <div>
        <h3>Contacto y redes</h3>

        <ul className="footer__lista">
          <li>
            <a href="tel:+50236304575">
              Teléfono: 3630-4575
            </a>
          </li>

          <li>
            <a href="mailto:destello98izabel@gmail.com">
              destello98izabel@gmail.com
            </a>
          </li>

          <li>
            <a
              href="https://wa.me/50236304575"
              target="_blank"
              rel="noopener noreferrer"
            >
              Escríbenos por WhatsApp
            </a>
          </li>

          <li>
            <a
              className="footer__red-social"
              href="https://www.instagram.com/cocos_silver/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
                focusable="false"
              >
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="5"
                />
                <circle cx="12" cy="12" r="4" />
                <circle
                  cx="17.5"
                  cy="6.5"
                  r="1"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>

              <span>Síguenos en Instagram</span>
            </a>
          </li>

          <li>
            <a
              className="footer__red-social"
              href="https://www.tiktok.com/@cocos_silver"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M14 3h3a5 5 0 0 0 5 5v3a8 8 0 0 1-5-1.7V16a6 6 0 1 1-6-6h1v3h-1a3 3 0 1 0 3 3V3Z" />
              </svg>

              <span>Síguenos en TikTok</span>
            </a>
          </li>
        </ul>
      </div>

      <nav aria-label="Navegación del pie de página">
        <h3>Explora</h3>

        <ul className="footer__lista">
          <li>
            <Link to="/">Inicio</Link>
          </li>

          <li>
            <Link to="/joyeria">Joyería</Link>
          </li>

          <li>
            <Link to="/nosotros">Nosotros</Link>
          </li>

          <li>
            <Link to="/contacto">
              Solicitar una cotización
            </Link>
          </li>
        </ul>
      </nav>

      <details
        className="footer__privacidad"
        id="privacidad"
      >
        <summary>Aviso de privacidad</summary>

        <div>
          <p>
            El formulario utiliza tu nombre, correo electrónico y
            consulta para preparar un mensaje de cotización en
            WhatsApp. Abrir WhatsApp no envía automáticamente el
            mensaje: tú decides cuándo enviarlo.
          </p>

          <p>
            Este sitio utiliza Google Analytics para medir las
            visitas y las interacciones con el botón de cotización.
            El evento de cotización no incluye el nombre, correo
            ni texto de tu consulta.
          </p>

          <p>
            Para consultas sobre el uso de tu información,
            escríbenos a{' '}
            <a href="mailto:destello98izabel@gmail.com">
              destello98izabel@gmail.com
            </a>.
          </p>
        </div>
      </details>

      <p className="footer__copyright">
        © {new Date().getFullYear()} Cocos Silver.
        Todos los derechos reservados.
      </p>
    </footer>
  );
}

export default Footer;