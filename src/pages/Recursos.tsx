import { useState } from 'react';
import { PRODUCTOS, CATEGORIAS } from '../datos';
import TarjetaProducto from '../components/TarjetaProducto';

function Recursos() {
  const [categoria, setCategoria] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');

  const productosFiltrados = PRODUCTOS.filter((producto) => {
    const coincideCategoria =
      categoria === 'Todos' || producto.categoria === categoria;

    const coincideBusqueda =
      producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      producto.descripcion.toLowerCase().includes(busqueda.toLowerCase());

    return coincideCategoria && coincideBusqueda;
  });

  return (
    <main className="catalogo">
      <section className="catalogo__encabezado">
        <span className="hero__etiqueta">Nuestra colección</span>
        <h1>Joyería Cocos Silver</h1>
        <p>Encuentra la pieza perfecta para complementar tu estilo.</p>
      </section>

      <div className="buscador">
        <label htmlFor="buscar-producto" className="buscador__label">
          Buscar joya
        </label>

        <input
          id="buscar-producto"
          type="search"
          placeholder="Buscar anillo, collar, pulsera..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="buscador__input"
        />
      </div>

      <div className="filtros">
        {CATEGORIAS.map((item) => (
          <button
            key={item}
            className={categoria === item ? 'filtro filtro--activo' : 'filtro'}
            onClick={() => setCategoria(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <section className="productos-grid">
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map((producto) => (
            <TarjetaProducto key={producto.id} producto={producto} />
          ))
        ) : (
          <div className="estado-vacio">
            <span>🔎</span>
            <h2>No encontramos resultados</h2>
            <p>Intenta buscar otra joya o seleccionar otra categoría.</p>
          </div>
        )}
      </section>
    </main>
  );
}

export default Recursos;
