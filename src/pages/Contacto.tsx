import { useState, type FormEvent } from 'react';

function Contacto() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const enviarFormulario = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!nombre.trim() || !correo.trim() || !mensaje.trim()) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim())) {
      setError('Ingresa un correo electrónico válido.');
      return;
    }

    setError('');

    const mensajeWhatsApp = encodeURIComponent(
      `Hola, quiero solicitar una cotización en Cocos Silver.

Nombre: ${nombre.trim()}
Correo: ${correo.trim()}
Joya o consulta: ${mensaje.trim()}`
    );

    const enlaceWhatsApp =
      `https://wa.me/50236304575?text=${mensajeWhatsApp}`;

      (window as Window & { gtag?: (...args: unknown[]) => void }).gtag?.(
  'event',
  'cotizacion_whatsapp_click'
);

    window.open(enlaceWhatsApp, '_blank', 'noopener,noreferrer');
  };

  return (
    <main className="contacto">
      <section className="contacto__encabezado">
        <span className="hero__etiqueta">Estamos para ayudarte</span>
        <h1>Solicita una cotización</h1>
        <p>
          ¿Te interesa alguna de nuestras joyas? Cuéntanos qué pieza buscas y
          prepararemos tu consulta para enviarla por WhatsApp.
        </p>
      </section>

      <section className="contacto__contenedor">
        <div className="contacto__info">
          <h2>Cocos Silver</h2>
          <p>💎 Joyería elegante para cada momento especial.</p>
          <p>📍 Guatemala</p>

          <p>
            📧{' '}
            <a href="mailto:destello98izabel@gmail.com">
              destello98izabel@gmail.com
            </a>
          </p>

          <p>
            📱{' '}
            <a
              href="https://wa.me/50236304575"
              target="_blank"
              rel="noopener noreferrer"
            >
              3630-4575
            </a>
          </p>
        </div>

        <form className="formulario" onSubmit={enviarFormulario} noValidate>
          <div className="formulario__grupo">
            <label htmlFor="nombre">Nombre</label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Escribe tu nombre"
              autoComplete="name"
              required
            />
          </div>

          <div className="formulario__grupo">
            <label htmlFor="correo">Correo electrónico</label>
            <input
              id="correo"
              name="correo"
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="correo@ejemplo.com"
              autoComplete="email"
              required
            />
          </div>

          <div className="formulario__grupo">
            <label htmlFor="mensaje">Joya o consulta</label>
            <textarea
              id="mensaje"
              name="mensaje"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              placeholder="Cuéntanos qué joya te interesa"
              rows={5}
              maxLength={300}
              required
            />
            <span className="contador-caracteres">
              {mensaje.length} / 300 caracteres
            </span>
          </div>

          {error && (
            <p className="mensaje-error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="boton boton--principal">
            Solicitar cotización por WhatsApp
          </button>
        </form>
      </section>
    </main>
  );
}

export default Contacto;