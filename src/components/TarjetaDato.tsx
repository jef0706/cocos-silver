import type { Cambio } from '../hooks/useTipoCambio';

type Props = {
  cambio: Cambio;
};

function TarjetaDato({ cambio }: Props) {
  return (
    <p className="tipo-cambio__valor">
      1 {cambio.base} ≈ Q{cambio.rate.toFixed(2)}
      <span> · Dato del {cambio.date}</span>
    </p>
  );
}

export default TarjetaDato;