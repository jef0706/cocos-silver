
import { useEffect, useState } from 'react';
import { PRODUCTOS, CATEGORIAS, type Producto } from '../datos';
import { cargarCatalogo } from '../catalogoSanity';
import TarjetaProducto from '../components/TarjetaProducto';

function Recursos() {
  const [categoria, setCategoria] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');
  const [productos, setProductos] = useState<Producto[]>(PRODUCTOS);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let activo = true;

    async function cargar() {
      try {
        const resultado = await cargarCatalogo();

        if (activo) {
          setProductos(resultado);
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    }

    void cargar();

    return () => {
      activo = false;
    };
  }, []);

  const productosFiltrados = productos.filter((producto) => {
    const coincideCategoria =
      categoria === 'Todos' || producto.categoria === categoria;

    const texto = busqueda.toLowerCase();

    const coincideBusqueda =
      producto.nombre.toLowerCase().includes(texto) ||
      producto.descripcion.toLowerCase().includes(texto);

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

      {cargando && (
        <p role="status" style={{ textAlign: 'center' }}>
          Actualizando catálogo...
        </p>
      )}

      <section className="productos-grid">
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map((producto) => (
            <TarjetaProducto
              key={producto.id}
              producto={producto}
            />
          ))
        ) : (
          <div className="estado-vacio">
            <span>🔎</span>
            <h2>No encontramos resultados</h2>
            <p>
              Intenta buscar otra joya o seleccionar otra categoría.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

export default Recursos;
