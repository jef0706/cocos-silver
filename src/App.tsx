
import { lazy, Suspense, useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';

import Navbar from './components/Navbar';
import Inicio from './pages/Inicio';
import Footer from './components/Footer';
import WhatsAppBoton from './components/WhatsAppBoton';

import type { Producto } from './datos';
import { cargarCatalogo } from './catalogoSanity';

const Recursos = lazy(() => import('./pages/Recursos'));
const DetalleRecurso = lazy(() => import('./pages/DetalleRecurso'));
const Nosotros = lazy(() => import('./pages/Nosotros'));
const Contacto = lazy(() => import('./pages/Contacto'));
const NoEncontrado = lazy(() => import('./pages/NoEncontrado'));

const URL_BASE = 'https://cocos-silver.vercel.app';

// Crear o actualizar etiquetas Open Graph
function actualizarMeta(propiedad: string, contenido: string) {
  let etiqueta = document.querySelector<HTMLMetaElement>(
    `meta[property="${propiedad}"]`
  );

  if (!etiqueta) {
    etiqueta = document.createElement('meta');
    etiqueta.setAttribute('property', propiedad);
    document.head.appendChild(etiqueta);
  }

  etiqueta.content = contenido;
}

// Controlar títulos y metadatos de cada página
function TituloPagina() {
  const location = useLocation();

  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);

  // Obtener productos publicados desde Sanity
  useEffect(() => {
    let activo = true;

    async function cargar() {
      try {
        const resultado = await cargarCatalogo();

        if (activo) {
          setProductos(resultado);
        }
      } catch (error) {
        console.error('Error al cargar los productos:', error);
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

  // Actualizar los metadatos según la página
  useEffect(() => {
    const datosPorRuta: Record<
      string,
      { titulo: string; descripcion: string }
    > = {
      '/': {
        titulo: 'Joyería elegante en Guatemala | Cocos Silver',
        descripcion:
          'Descubre joyería elegante de Cocos Silver para complementar tu estilo y hacer especial cada momento.',
      },

      '/joyeria': {
        titulo: 'Anillos y aretes elegantes | Cocos Silver',
        descripcion:
          'Explora la colección de anillos, aretes, gargantillas, dijes y pulseras de Cocos Silver.',
      },

      '/nosotros': {
        titulo: 'Conoce Cocos Silver | Joyería en Guatemala',
        descripcion:
          'Conoce la historia, los valores y la dedicación que distinguen a Cocos Silver en Guatemala.',
      },

      '/contacto': {
        titulo: 'Contacto y pedidos | Cocos Silver',
        descripcion:
          'Comunícate con Cocos Silver para consultar productos, disponibilidad y realizar pedidos de joyería.',
      },
    };

    let datos = datosPorRuta[location.pathname];

    let imagen = `${URL_BASE}/productos/joyeria/rubi-corazon.jpeg`;
    let tipoContenido = 'website';

    // Metadatos dinámicos para el detalle de una joya
    if (location.pathname.startsWith('/joyeria/')) {
      const id = location.pathname.split('/').pop();

      const producto = productos.find(
        (item) => String(item.id) === id
      );

      if (producto) {
        datos = {
          titulo: `${producto.nombre} | Cocos Silver`,
          descripcion:
            `${producto.descripcion} Consulta precio y disponibilidad en Cocos Silver.`,
        };

        imagen = new URL(producto.imagen, `${URL_BASE}/`).href;
        tipoContenido = 'product';
      } else if (cargando) {
        datos = {
          titulo: 'Cargando joya | Cocos Silver',
          descripcion:
            'Estamos cargando la información de esta joya.',
        };
      } else {
        datos = {
          titulo: 'Producto no encontrado | Cocos Silver',
          descripcion:
            'El producto solicitado no existe o no está disponible en Cocos Silver.',
        };
      }
    }

    // Página no encontrada
    if (!datos) {
      datos = {
        titulo: 'Página no encontrada | Cocos Silver',
        descripcion:
          'La página solicitada no existe. Visita la colección de Cocos Silver.',
      };
    }

    const urlCanonica = `${URL_BASE}${location.pathname}`;

    // Título del navegador
    document.title = datos.titulo;

    // Meta description
    let metaDescripcion = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]'
    );

    if (!metaDescripcion) {
      metaDescripcion = document.createElement('meta');
      metaDescripcion.name = 'description';
      document.head.appendChild(metaDescripcion);
    }

    metaDescripcion.content = datos.descripcion;

    // URL canónica
    let canonical = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]'
    );

    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }

    canonical.href = urlCanonica;

    // Metadatos Open Graph
    actualizarMeta('og:title', datos.titulo);
    actualizarMeta('og:description', datos.descripcion);
    actualizarMeta('og:url', urlCanonica);
    actualizarMeta('og:type', tipoContenido);
    actualizarMeta('og:image', imagen);
    actualizarMeta('og:site_name', 'Cocos Silver');
    actualizarMeta('og:locale', 'es_GT');

  }, [location.pathname, productos, cargando]);

  return null;
}

// Aplicación principal
function App() {
  return (
    <BrowserRouter>
      <TituloPagina />

      <Navbar />

      <Suspense
        fallback={
          <main aria-busy="true">
            <p
              role="status"
              style={{
                padding: '2rem',
                textAlign: 'center',
              }}
            >
              Cargando página...
            </p>
          </main>
        }
      >
        <Routes>
          <Route path="/" element={<Inicio />} />

          <Route path="/joyeria" element={<Recursos />} />

          <Route
            path="/joyeria/:id"
            element={<DetalleRecurso />}
          />

          <Route path="/nosotros" element={<Nosotros />} />

          <Route path="/contacto" element={<Contacto />} />

          <Route path="*" element={<NoEncontrado />} />
        </Routes>
      </Suspense>

      <WhatsAppBoton />

      <Footer />
    </BrowserRouter>
  );
}

export default App;
