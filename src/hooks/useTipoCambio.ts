import { useEffect, useState } from 'react';

export type Cambio = {
  date: string;
  base: string;
  quote: string;
  rate: number;
};

export type EstadoCambio = 'cargando' | 'error' | 'vacio' | 'exito';

export function useTipoCambio() {
  const [cambio, setCambio] = useState<Cambio | null>(null);
  const [estado, setEstado] = useState<EstadoCambio>('cargando');
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
          throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
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

  return {
    cambio,
    estado,
    reintentar: () => setIntento((actual) => actual + 1),
  };
}