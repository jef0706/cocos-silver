import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero__contenido">
        <span className="hero__etiqueta">
          Elegancia en cada detalle
        </span>

        <h1>
          Joyas que hacen brillar
          <span> cada momento</span>
        </h1>

        <p>
          Encuentra una pieza especial para ti o para regalar. En Cocos Silver
          te ayudamos a elegir la joya ideal para cada ocasión.
        </p>

        <div className="hero__botones">
          <Link to="/contacto" className="boton boton--principal">
            Solicitar una cotización
          </Link>
        </div>
      </div>

      <div className="hero__visual">
        <div className="hero__tarjeta">
          <span className="hero__icono" aria-hidden="true">
            💎
          </span>
          <h2>Cocos Silver</h2>
          <p>Elegancia que permanece.</p>
        </div>
      </div>
    </section>
  );
}

export default Hero;