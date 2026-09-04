# 💎 Cocos Silver

Cocos Silver es un sitio web de joyería desarrollado con React, TypeScript y Vite.

El proyecto permite navegar por diferentes páginas, visualizar una colección de joyas, filtrar productos por categoría, consultar el detalle de cada producto y enviar un formulario de contacto.

## Tecnologías utilizadas

- React
- TypeScript
- Vite
- React Router DOM
- CSS

## Funcionalidades

- Página de inicio
- Catálogo de joyería
- Filtro por categorías
- Detalle de productos mediante rutas dinámicas
- Página Nosotros
- Formulario de contacto con validación
- Mensajes de error y confirmación
- Página 404
- Diseño responsive
- Componentes reutilizables
- Variables CSS
- Contador de caracteres
- Títulos dinámicos en el navegador

## Rutas principales

- `/` — Inicio
- `/joyeria` — Catálogo
- `/joyeria/:id` — Detalle del producto
- `/nosotros` — Nosotros
- `/contacto` — Contacto

## Estructura principal

```text
src/
├── components/
│   ├── Footer.tsx
│   ├── Navbar.tsx
│   └── TarjetaProducto.tsx
│
├── pages/
│   ├── Contacto.tsx
│   ├── DetalleRecurso.tsx
│   ├── Inicio.tsx
│   ├── NoEncontrado.tsx
│   ├── Nosotros.tsx
│   └── Recursos.tsx
│
├── App.tsx
├── datos.ts
├── index.css
└── main.tsx
```
