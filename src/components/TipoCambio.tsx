import { useEffect, useState } from 'react';

type Cambio = {
  date: string;
  base: string;
  quote: string;
  rate: number;
};

function TipoCambio() {
  const [cambio, setCambio] = useState<Cambio | null>(null);
  const [estado, setEstado] = useState<'cargando' | 'error' | 'vacio' | 'exito'>(
    'cargando'
  );
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function cargarCambio() {
      setEstado('cargando');

      try {
        const respuesta = await fetch(
          'https://api.frankfurter.dev/v2/rate/usd/gtq',
          { signal: controller.signal }
        );

        if (!respuesta.ok) {
          throw new Error(`Error ${respuesta.status}`);
        }

        const datos: Cambio = await respuesta.json();

        if (controller.signal.aborted) return;

        if (
          !datos ||
          typeof datos.rate !== 'number' ||
          !Number.isFinite(datos.rate) ||
          datos.rate <= 0 ||
          !datos.date
        ) {
          setCambio(null);
          setEstado('vacio');
          return;
        }

        setCambio(datos);
        setEstado('exito');
      } catch {
        if (!controller.signal.aborted) {
          setCambio(null);
          setEstado('error');
        }
      }
    }

    void cargarCambio();
    return () => controller.abort();
  }, [intento]);

  return (
    <section className="tipo-cambio" aria-labelledby="tipo-cambio-titulo">
      <span className="hero__etiqueta">Información en vivo</span>
      <h2 id="tipo-cambio-titulo">
        Referencia de cambio para clientes internacionales
      </h2>

      {estado === 'cargando' && (
        <div className="tipo-cambio__cargando" role="status">
          Consultando el tipo de cambio…
        </div>
      )}

      {estado === 'error' && (
        <div role="alert">
          <p>No pudimos consultar el tipo de cambio en este momento.</p>
          <button
            type="button"
            className="boton boton--secundario"
            onClick={() => setIntento((actual) => actual + 1)}
          >
            Reintentar
          </button>
        </div>
      )}

      {estado === 'vacio' && (
        <p role="status">No hay un tipo de cambio disponible por ahora.</p>
      )}

      {estado === 'exito' && cambio && (
        <p className="tipo-cambio__valor">
          1 USD ≈ Q{cambio.rate.toFixed(2)}
          <span> · Dato del {cambio.date}</span>
        </p>
      )}

      <small>
        Referencia informativa. Las cotizaciones de joyería se confirman por
        contacto.
      </small>
    </section>
  );
}

export default TipoCambio;