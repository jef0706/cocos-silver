import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar__marca">💎 Cocos Silver</div>

      <button
        className="navbar__toggle"
        onClick={() => setMenuAbierto(!menuAbierto)}
        aria-label="Abrir o cerrar menú"
        aria-expanded={menuAbierto}
      >
        ☰
      </button>

      <ul
        className={
          menuAbierto ? 'navbar__links navbar__links--abierto' : 'navbar__links'
        }
      >
        <li>
          <NavLink
            to="/"
            onClick={cerrarMenu}
            className={({ isActive }) => (isActive ? 'activo' : '')}
          >
            Inicio
          </NavLink>
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
