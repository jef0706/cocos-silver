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

function TituloPagina() {
  const location = useLocation();

  useEffect(() => {
    const titulos: Record<string, string> = {
      '/': 'Cocos Silver | Inicio',
      '/joyeria': 'Cocos Silver | Joyería',
      '/nosotros': 'Cocos Silver | Nosotros',
      '/contacto': 'Cocos Silver | Contacto',
    };

    if (location.pathname.startsWith('/joyeria/')) {
      document.title = 'Cocos Silver | Detalle de producto';
    } else {
      document.title =
        titulos[location.pathname] || 'Cocos Silver | Página no encontrada';
    }
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
