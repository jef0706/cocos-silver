
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { type Producto } from '../datos';
import { cargarCatalogo } from '../catalogoSanity';

function DetalleRecurso() {
  const { id } = useParams();

  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let activo = true;

    cargarCatalogo()
      .then((resultado) => {
        if (activo) {
          setProductos(resultado);
        }
      })
      .finally(() => {
        if (activo) {
          setCargando(false);
        }
      });

    return () => {
      activo = false;
    };
  }, []);

  const producto = productos.find(
    (item) => String(item.id) === id
  );

  if (cargando) {
    return (
      <main className="detalle-producto">
        <p role="status">Cargando información de la joya...</p>
      </main>
    );
  }

  if (!producto) {
    return (
      <main className="detalle-producto">
        <h1>Producto no encontrado</h1>

        <p>La joya que buscas no existe o no está disponible.</p>

        <Link to="/joyeria" className="boton boton--principal">
          Volver a la colección
        </Link>
      </main>
    );
  }

  const mensajeWhatsApp = encodeURIComponent(
    `Hola, me interesa ${producto.nombre} de Q${producto.precio}. ¿Está disponible?`
  );

  const enlaceWhatsApp =
    `https://wa.me/50236304575?text=${mensajeWhatsApp}`;

  return (
    <main className="detalle-producto">
      <Link to="/joyeria" className="volver">
        ← Volver a la colección
      </Link>

      <section className="detalle-producto__contenido">
        <div className="detalle-producto__imagen">
          <img
            src={producto.imagen}
            alt={`${producto.nombre} de Cocos Silver`}
            width="900"
            height="900"
            decoding="async"
          />
        </div>

        <div className="detalle-producto__info">
          <span className="tarjeta-producto__categoria">
            {producto.categoria}
          </span>

          <h1>{producto.nombre}</h1>

          <p className="detalle-producto__descripcion">
            {producto.descripcion}
          </p>

          <p className="detalle-producto__precio">
            Q{producto.precio}
          </p>

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
