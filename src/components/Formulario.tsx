import { useState, type FormEvent } from 'react';

type Datos = {
  nombre: string;
  correo: string;
  mensaje: string;
};

type Errores = Partial<Record<keyof Datos, string>>;

function crearEnlace(datos: Datos) {
  const texto = `Hola, quiero solicitar una cotización en Cocos Silver.

Nombre: ${datos.nombre}
Correo: ${datos.correo}
Joya o consulta: ${datos.mensaje}`;

  return `https://wa.me/50236304575?text=${encodeURIComponent(texto)}`;
}

function Formulario() {
  const [datos, setDatos] = useState<Datos>({
    nombre: '',
    correo: '',
    mensaje: '',
  });

  const [errores, setErrores] = useState<Errores>({});
  const [confirmacion, setConfirmacion] = useState<Datos | null>(null);

  function actualizar(campo: keyof Datos, valor: string) {
    setDatos((actual) => ({ ...actual, [campo]: valor }));
    setErrores((actual) => ({ ...actual, [campo]: undefined }));
    setConfirmacion(null);
  }

  function enviarFormulario(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (confirmacion) return;

    const consulta: Datos = {
      nombre: datos.nombre.trim(),
      correo: datos.correo.trim(),
      mensaje: datos.mensaje.trim(),
    };

    const nuevosErrores: Errores = {};

    if (!consulta.nombre) {
      nuevosErrores.nombre = 'Escribe tu nombre.';
    }

    if (!consulta.correo) {
      nuevosErrores.correo = 'Escribe tu correo electrónico.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(consulta.correo)) {
      nuevosErrores.correo = 'Ingresa un correo electrónico válido.';
    }

    if (!consulta.mensaje) {
      nuevosErrores.mensaje = 'Indica qué joya te interesa o tu consulta.';
    }

    setErrores(nuevosErrores);

    const primerCampo = (Object.keys(nuevosErrores) as Array<keyof Datos>)[0];

    if (primerCampo) {
      const campo = e.currentTarget.elements.namedItem(primerCampo);
      if (campo instanceof HTMLElement) campo.focus();
      return;
    }

    setConfirmacion(consulta);

    (window as Window & {
      gtag?: (...args: unknown[]) => void;
    }).gtag?.('event', 'cotizacion_whatsapp_click');

    window.open(crearEnlace(consulta), '_blank', 'noopener,noreferrer');
  }

  return (
    <form className="formulario" onSubmit={enviarFormulario} noValidate>
      <div className="formulario__grupo">
        <label htmlFor="nombre">Nombre</label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          value={datos.nombre}
          onChange={(e) => actualizar('nombre', e.target.value)}
          placeholder="Escribe tu nombre"
          autoComplete="name"
          maxLength={80}
          required
          aria-invalid={Boolean(errores.nombre)}
          aria-describedby={errores.nombre ? 'error-nombre' : undefined}
        />
        {errores.nombre && (
          <p id="error-nombre" className="mensaje-error" role="alert">
            {errores.nombre}
          </p>
        )}
      </div>

      <div className="formulario__grupo">
        <label htmlFor="correo">Correo electrónico</label>
        <input
          id="correo"
          name="correo"
          type="email"
          value={datos.correo}
          onChange={(e) => actualizar('correo', e.target.value)}
          placeholder="correo@ejemplo.com"
          autoComplete="email"
          maxLength={254}
          required
          aria-invalid={Boolean(errores.correo)}
          aria-describedby={errores.correo ? 'error-correo' : undefined}
        />
        {errores.correo && (
          <p id="error-correo" className="mensaje-error" role="alert">
            {errores.correo}
          </p>
        )}
      </div>

      <div className="formulario__grupo">
        <label htmlFor="mensaje">Joya o consulta</label>
        <textarea
          id="mensaje"
          name="mensaje"
          value={datos.mensaje}
          onChange={(e) => actualizar('mensaje', e.target.value)}
          placeholder="Cuéntanos qué joya te interesa"
          rows={5}
          maxLength={300}
          required
          aria-invalid={Boolean(errores.mensaje)}
          aria-describedby={
            errores.mensaje
              ? 'contador-mensaje error-mensaje'
              : 'contador-mensaje'
          }
        />
        <span id="contador-mensaje" className="contador-caracteres">
          {datos.mensaje.length} / 300 caracteres
        </span>
        {errores.mensaje && (
          <p id="error-mensaje" className="mensaje-error" role="alert">
            {errores.mensaje}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="boton boton--principal"
        disabled={Boolean(confirmacion)}
      >
        {confirmacion
          ? 'Consulta preparada'
          : 'Solicitar cotización por WhatsApp'}
      </button>

      {confirmacion && (
        <div className="formulario__confirmacion" role="status">
          <h2>Tu consulta está preparada</h2>
          <p><strong>Nombre:</strong> {confirmacion.nombre}</p>
          <p><strong>Correo:</strong> {confirmacion.correo}</p>
          <p><strong>Consulta:</strong> {confirmacion.mensaje}</p>
          <p>
            Revisa el mensaje y pulsa Enviar en WhatsApp para completar
            la solicitud.
          </p>
          <a
            href={crearEnlace(confirmacion)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Abrir WhatsApp si no se abrió
          </a>
          <p>Puedes editar los campos para preparar otra consulta.</p>
        </div>
      )}
    </form>
  );
}

export default Formulario;