import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import Navbar from './components/Navbar';
import Inicio from './pages/Inicio';
import Recursos from './pages/Recursos';
import DetalleRecurso from './pages/DetalleRecurso';
import Nosotros from './pages/Nosotros';
import Contacto from './pages/Contacto';
import Footer from './components/Footer';
import NoEncontrado from './pages/NoEncontrado';
import WhatsAppBoton from './components/WhatsAppBoton';
import { PRODUCTOS } from './datos';


function TituloPagina() {
  const location = useLocation();

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
          'Explora la colección de anillos y aretes de Cocos Silver y encuentra una joya especial para cada ocasión.',
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

    if (location.pathname.startsWith('/joyeria/')) {
      const id = Number(location.pathname.split('/').pop());
      const producto = PRODUCTOS.find((item) => item.id === id);

      datos = producto
        ? {
            titulo: `${producto.nombre} | Cocos Silver`,
            descripcion: `${producto.descripcion} Consulta precio y disponibilidad en Cocos Silver.`,
          }
        : {
            titulo: 'Producto no encontrado | Cocos Silver',
            descripcion:
              'El producto solicitado no está disponible en Cocos Silver.',
          };
    }

    if (!datos) {
      datos = {
        titulo: 'Página no encontrada | Cocos Silver',
        descripcion:
          'La página solicitada no existe. Visita la colección de Cocos Silver.',
      };
    }

    document.title = datos.titulo;

    let metaDescripcion = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );

    if (!metaDescripcion) {
      metaDescripcion = document.createElement('meta');
      metaDescripcion.name = 'description';
      document.head.appendChild(metaDescripcion);
    }

    metaDescripcion.content = datos.descripcion;
  }, [location.pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <TituloPagina />

      <Navbar />

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/joyeria" element={<Recursos />} />
        <Route path="/joyeria/:id" element={<DetalleRecurso />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="*" element={<NoEncontrado />} />
      </Routes>

      <WhatsAppBoton />

      <Footer />
    </BrowserRouter>
  );
}

export default App;
