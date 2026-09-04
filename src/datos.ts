export interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  imagen: string;
  descripcion: string;
  destacado: boolean;
}

export const PRODUCTOS: Producto[] = [
  {
    id: 1,
    nombre: 'Zafiro Corazón',
    categoria: 'Anillos',
    precio: 175,
    imagen: '/productos/joyeria/zafiro-corazón.jpeg',
    descripcion: 'Anillo con piedra azul en forma de corazón.',
    destacado: true,
  },
  {
    id: 2,
    nombre: 'Corazón Martillado',
    categoria: 'Anillos',
    precio: 135,
    imagen: '/productos/joyeria/corazon-martillado.jpeg',
    descripcion:
      'Anillo con piedra azul en forma de corazón y argolla martillada.',
    destacado: true,
  },
  {
    id: 3,
    nombre: 'Rubí Corazón',
    categoria: 'Anillos',
    precio: 175,
    imagen: '/productos/joyeria/rubi-corazon.jpeg',
    descripcion: 'Anillo con piedra roja en forma de corazón.',
    destacado: true,
  },
  {
    id: 4,
    nombre: 'Argollas Espiral',
    categoria: 'Aretes',
    precio: 155,
    imagen: '/productos/joyeria/argollas-espiral.jpeg',
    descripcion: 'Argollas plateadas con diseño elegante.',
    destacado: false,
  },
  {
    id: 5,
    nombre: 'Corazón Cristal',
    categoria: 'Aretes',
    precio: 140,
    imagen: '/productos/joyeria/corazon-cristal.jpeg',
    descripcion: 'Aretes con diseño de corazón y piedra transparente.',
    destacado: true,
  },
];

export const CATEGORIAS = [
  'Todos',
  'Anillos',
  'Collares',
  'Pulseras',
  'Aretes',
];
