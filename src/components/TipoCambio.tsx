import { useTipoCambio } from '../hooks/useTipoCambio';
import EstadoPeticion from './EstadoPeticion';
import TarjetaDato from './TarjetaDato';

function TipoCambio() {
  const { cambio, estado, reintentar } = useTipoCambio();

  return (
    <section className="tipo-cambio" aria-labelledby="tipo-cambio-titulo">
      <span className="hero__etiqueta">Información en vivo</span>

      <h2 id="tipo-cambio-titulo">
        Referencia de cambio para clientes internacionales
      </h2>

      {estado === 'exito' && cambio ? (
        <TarjetaDato cambio={cambio} />
      ) : (
        <EstadoPeticion estado={estado} reintentar={reintentar} />
      )}

      <small>
        Referencia informativa. Las cotizaciones de joyería se confirman por
        contacto.
      </small>
    </section>
  );
}

export default TipoCambio;