import { Link } from 'react-router-dom';

function NoEncontrado() {
  return (
    <main className="no-encontrado">
      <div className="no-encontrado__contenido">
        <span className="no-encontrado__numero">404</span>

        <h1>Página no encontrada</h1>

        <p>Lo sentimos, la página que buscas no existe o fue movida.</p>

        <Link to="/" className="boton boton--principal">
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}

export default NoEncontrado;
