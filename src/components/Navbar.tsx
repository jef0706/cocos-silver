import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const location = useLocation();

  const cerrarMenu = () => setMenuAbierto(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (location.hash) {
        document
          .getElementById(location.hash.slice(1))
          ?.scrollIntoView({ block: 'start' });
      } else {
        window.scrollTo({ top: 0, left: 0 });
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.pathname, location.hash]);

  function irASeccion(id: string) {
    cerrarMenu();

    // Permite volver a una sección aunque su enlace ya esté seleccionado.
    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ block: 'start' });
    }
  }

  return (
    <nav className="navbar" aria-label="Navegación principal">
      <Link to="/" className="navbar__marca" onClick={cerrarMenu}>
        💎 Cocos Silver
      </Link>

      <button
        type="button"
        className="navbar__toggle"
        onClick={() => setMenuAbierto((actual) => !actual)}
        aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={menuAbierto}
        aria-controls="menu-principal"
      >
        ☰
      </button>

      <ul
        id="menu-principal"
        className={
          menuAbierto
            ? 'navbar__links navbar__links--abierto'
            : 'navbar__links'
        }
      >
        <li>
          <NavLink
            to="/"
            end
            onClick={cerrarMenu}
            className={({ isActive }) =>
              isActive && !location.hash ? 'activo' : ''
            }
          >
            Inicio
          </NavLink>
        </li>

        <li>
          <Link
            to="/#beneficios"
            onClick={() => irASeccion('beneficios')}
            className={
              location.pathname === '/' &&
              location.hash === '#beneficios'
                ? 'activo'
                : ''
            }
            aria-current={
              location.pathname === '/' &&
              location.hash === '#beneficios'
                ? 'location'
                : undefined
            }
          >
            Beneficios
          </Link>
        </li>

        <li>
          <Link
            to="/#coleccion"
            onClick={() => irASeccion('coleccion')}
            className={
              location.pathname === '/' &&
              location.hash === '#coleccion'
                ? 'activo'
                : ''
            }
            aria-current={
              location.pathname === '/' &&
              location.hash === '#coleccion'
                ? 'location'
                : undefined
            }
          >
            Colección
          </Link>
        </li>

        <li>
          <NavLink
            to="/joyeria"
            onClick={cerrarMenu}
            className={({ isActive }) => (isActive ? 'activo' : '')}
          >
            Joyería
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/nosotros"
            onClick={cerrarMenu}
            className={({ isActive }) => (isActive ? 'activo' : '')}
          >
            Nosotros
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/contacto"
            onClick={cerrarMenu}
            className={({ isActive }) => (isActive ? 'activo' : '')}
          >
            Contacto
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;