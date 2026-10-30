
import { useEffect, useState } from 'react';
import { CATEGORIAS, type Producto } from '../datos';
import { cargarCatalogo } from '../catalogoSanity';
import TarjetaProducto from '../components/TarjetaProducto';

function Recursos() {
  const [categoria, setCategoria] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');

  // No mostrar productos antiguos mientras carga Sanity
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);

  // Consultar los productos publicados en Sanity
  useEffect(() => {
    let activo = true;

    async function cargarProductos() {
      try {
        const resultado = await cargarCatalogo();

        if (activo) {
          setProductos(resultado);
        }
      } catch (error) {
        console.error('Error al cargar el catálogo:', error);

        if (activo) {
          setProductos([]);
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    }

    void cargarProductos();

    return () => {
      activo = false;
    };
  }, []);

  // Filtrar por categoría y nombre o descripción
  const productosFiltrados = productos.filter((producto) => {
    const coincideCategoria =
      categoria === 'Todos' ||
      producto.categoria === categoria;

    const textoBusqueda = busqueda.trim().toLowerCase();

    const coincideBusqueda =
      producto.nombre.toLowerCase().includes(textoBusqueda) ||
      producto.descripcion.toLowerCase().includes(textoBusqueda);

    return coincideCategoria && coincideBusqueda;
  });

  return (
    <main className="catalogo">
      <section className="catalogo__encabezado">
        <span className="hero__etiqueta">
          Nuestra colección
        </span>

        <h1>Joyería Cocos Silver</h1>

        <p>
          Encuentra la pieza perfecta para complementar tu estilo.
        </p>
      </section>

      <div className="buscador">
        <label
          htmlFor="buscar-producto"
          className="buscador__label"
        >
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
            type="button"
            className={
              categoria === item
                ? 'filtro filtro--activo'
                : 'filtro'
            }
            onClick={() => setCategoria(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {cargando && (
        <p
          role="status"
          style={{
            textAlign: 'center',
            padding: '2rem',
          }}
        >
          Actualizando catálogo...
        </p>
      )}

      {!cargando && (
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
                No hay productos disponibles que coincidan
                con tu búsqueda. Intenta otra categoría
                o vuelve a consultar más tarde.
              </p>
            </div>
          )}
        </section>
      )}
    </main>
  );
}

export default Recursos;
