import { useState, type FormEvent } from 'react';

function Contacto() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const enviarFormulario = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!nombre || !correo || !mensaje) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    if (!correo.includes('@')) {
      setError('Ingresa un correo electrónico válido.');
      return;
    }

    setError('');

    const mensajeWhatsApp = encodeURIComponent(
      `Hola, soy ${nombre}.

Correo: ${correo}

Consulta:
${mensaje}`
    );

    const enlaceWhatsApp = `https://wa.me/50236304575?text=${mensajeWhatsApp}`;

    window.open(enlaceWhatsApp, '_blank');
  };

  return (
    <main className="contacto">
      <section className="contacto__encabezado">
        <span className="hero__etiqueta">Estamos para ayudarte</span>

        <h1>Contáctanos</h1>

        <p>
          ¿Te interesa alguna de nuestras joyas? Escríbenos y con gusto te
          ayudaremos a encontrar la pieza perfecta.
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

        <form className="formulario" onSubmit={enviarFormulario}>
          <div className="formulario__grupo">
            <label htmlFor="nombre">Nombre</label>

            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Escribe tu nombre"
            />
          </div>

          <div className="formulario__grupo">
            <label htmlFor="correo">Correo electrónico</label>

            <input
              id="correo"
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="correo@ejemplo.com"
            />
          </div>

          <div className="formulario__grupo">
            <label htmlFor="mensaje">Mensaje</label>

            <textarea
              id="mensaje"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              placeholder="Cuéntanos qué joya te interesa"
              rows={5}
              maxLength={300}
            />

            <span className="contador-caracteres">
              {mensaje.length} / 300 caracteres
            </span>
          </div>

          {error && <p className="mensaje-error">{error}</p>}

          <button type="submit" className="boton boton--principal">
            Enviar por WhatsApp
          </button>
        </form>
      </section>
    </main>
  );
}

export default Contacto;
