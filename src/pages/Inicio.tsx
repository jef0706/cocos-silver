import { PRODUCTOS } from '../datos';
import TarjetaProducto from '../components/TarjetaProducto';

import { Link } from 'react-router-dom';

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

          <section className="destacados">
            <div className="destacados__encabezado">
              <span className="hero__etiqueta">Selección especial</span>

              <h2>Joyas destacadas</h2>

              <p>
                Descubre algunas de nuestras piezas favoritas de Cocos Silver.
              </p>
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

          <p>
            Descubre Cocos Silver, una colección de joyería diseñada para
            complementar tu estilo y convertir cada ocasión en algo especial.
          </p>

          <div className="hero__botones">
            <Link to="/joyeria" className="boton boton--principal">
              Ver colección
            </Link>

            <Link to="/nosotros" className="boton boton--secundario">
              Conócenos
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
    </main>
  );
}

export default Inicio;
