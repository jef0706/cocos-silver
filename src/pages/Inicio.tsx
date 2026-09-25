import { Link } from 'react-router-dom';
import TarjetaProducto from '../components/TarjetaProducto';
import { PRODUCTOS } from '../datos';
import TipoCambio from '../components/TipoCambio';

function Inicio() {
  const destacados = PRODUCTOS.filter((producto) => producto.destacado);

  return (
    <main>
      <section className="hero">
        <div className="hero__contenido">
          <span className="hero__etiqueta">Elegancia en cada detalle</span>

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
            <span className="hero__icono">💎</span>
            <h2>Cocos Silver</h2>
            <p>Elegancia que permanece.</p>
          </div>
        </div>
      </section>

      <section className="beneficios">
        <span className="hero__etiqueta">¿Por qué elegirnos?</span>
        <h2>Una joya para cada momento especial</h2>
        <div className="beneficios__grid">
          <article>
            <h3>Diseños para tu estilo</h3>
            <p>Explora piezas que complementan tus momentos cotidianos y especiales.</p>
          </article>
          <article>
            <h3>Atención personal</h3>
            <p>Cuéntanos qué buscas y te ayudaremos a elegir una pieza.</p>
          </article>
          <article>
            <h3>Regalos con significado</h3>
            <p>Encuentra un detalle para celebrar a alguien importante.</p>
          </article>
        </div>
      </section>

      <section className="destacados">
        <div className="destacados__encabezado">
          <span className="hero__etiqueta">Selección especial</span>
          <h2>Joyas destacadas</h2>
          <p>Descubre algunas de nuestras piezas favoritas de Cocos Silver.</p>
        </div>

        <div className="productos-grid">
          {destacados.map((producto) => (
            <TarjetaProducto key={producto.id} producto={producto} />
          ))}
        </div>

        <div className="destacados__boton">
          <Link to="/joyeria" className="boton boton--secundario">
            Ver toda la colección
          </Link>
        </div>
      </section>
      <TipoCambio />

      <section className="confianza">
        <span className="hero__etiqueta">Conoce la marca</span>
        <h2>Joyas elegidas con atención a los detalles</h2>
        <p>
          Conoce más sobre Cocos Silver y la inspiración detrás de nuestra
          colección.
        </p>
        <Link to="/nosotros" className="boton boton--secundario">
          Conócenos
        </Link>
      </section>

      <section className="cta-final">
        <h2>¿Encontraste una joya que te gusta?</h2>
        <p>Escríbenos para consultar por la pieza que tienes en mente.</p>
        <Link to="/contacto" className="boton boton--principal">
          Solicitar una cotización
        </Link>
      </section>
    </main>
  );
}

export default Inicio;