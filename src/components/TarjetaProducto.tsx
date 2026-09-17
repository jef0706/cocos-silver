import { Link } from 'react-router-dom';
import type { Producto } from '../datos';

interface Props {
  producto: Producto;
}

function TarjetaProducto({ producto }: Props) {
  return (
    <article className="tarjeta-producto">
      <div className="tarjeta-producto__imagen">
       <img
  src={producto.imagen}
  alt={`${producto.nombre} de Cocos Silver`}
  width="600"
  height="450"
  loading="lazy"
  decoding="async"
/>
      </div>

      <span className="tarjeta-producto__categoria">{producto.categoria}</span>

      <h3>{producto.nombre}</h3>

      <p>{producto.descripcion}</p>

      <strong className="tarjeta-producto__precio">Q{producto.precio}</strong>

      <Link to={`/joyeria/${producto.id}`} className="boton boton--principal">
        Ver detalle
      </Link>
    </article>
  );
}

export default TarjetaProducto;
