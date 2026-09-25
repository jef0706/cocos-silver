import type { EstadoCambio } from '../hooks/useTipoCambio';

type Props = {
  estado: EstadoCambio;
  reintentar: () => void;
};

function EstadoPeticion({ estado, reintentar }: Props) {
  if (estado === 'cargando') {
    return (
      <div className="tipo-cambio__cargando" role="status">
        Consultando el tipo de cambio…
      </div>
    );
  }

  if (estado === 'error') {
    return (
      <div role="alert">
        <p>No pudimos consultar el tipo de cambio en este momento.</p>
        <button
          type="button"
          className="boton boton--secundario"
          onClick={reintentar}
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (estado === 'vacio') {
    return (
      <p role="status">No hay un tipo de cambio disponible por ahora.</p>
    );
  }

  return null;
}

export default EstadoPeticion;