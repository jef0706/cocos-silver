
import { sanityClient } from './sanity';

export interface ProductoSanity {
  _id: string;
  id?: number;
  nombre: string;
  categoria: string;
  precio: number;
  descripcion?: string;
  destacado?: boolean;
  disponible?: boolean;
  imagenUrl?: string;
  imagenOriginal?: string;
}

const consultaProductos = `
  *[
    _type == "producto" &&
    disponible != false
  ] | order(nombre asc) {
    _id,
    id,
    nombre,
    categoria,
    precio,
    descripcion,
    destacado,
    disponible,
    "imagenUrl": imagen.asset->url,
    imagenOriginal
  }
`;

export async function obtenerProductosSanity(): Promise<ProductoSanity[]> {
  return sanityClient.fetch<ProductoSanity[]>(consultaProductos);
}
