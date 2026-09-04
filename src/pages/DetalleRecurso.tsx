import { Link, useParams } from 'react-router-dom';
import { PRODUCTOS } from '../datos';

function DetalleRecurso() {
  const { id } = useParams();

  const producto = PRODUCTOS.find((producto) => producto.id === Number(id));

  if (!producto) {
    return (
      <main className="detalle-producto">
        <h1>Producto no encontrado</h1>

        <p>La joya que buscas no existe.</p>

        <Link to="/joyeria" className="boton boton--principal">
          Volver a la colección
        </Link>
      </main>
    );
  }

  const mensajeWhatsApp = encodeURIComponent(
    `Hola, me interesa ${producto.nombre} de Q${producto.precio}. ¿Está disponible?`
  );

  const enlaceWhatsApp = `https://wa.me/50236304575?text=${mensajeWhatsApp}`;

  return (
    <main className="detalle-producto">
      <Link to="/joyeria" className="volver">
        ← Volver a la colección
      </Link>

      <section className="detalle-producto__contenido">
        <div className="detalle-producto__imagen">
          <img src={producto.imagen} alt={producto.nombre} />
        </div>

        <div className="detalle-producto__info">
          <span className="tarjeta-producto__categoria">
            {producto.categoria}
          </span>

          <h1>{producto.nombre}</h1>

          <p className="detalle-producto__descripcion">
            {producto.descripcion}
          </p>

          <p className="detalle-producto__precio">Q{producto.precio}</p>

          <a
            href={enlaceWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="boton boton--principal"
            aria-label={`Consultar ${producto.nombre} por WhatsApp`}
          >
            Consultar por WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}

export default DetalleRecurso;
