
import { PRODUCTOS, type Producto } from './datos';
import { obtenerProductosSanity } from './productosSanity';

export async function cargarCatalogo(): Promise<Producto[]> {
  try {
    const productosSanity = await obtenerProductosSanity();

    return productosSanity
      .map((producto): Producto => {
        const original = PRODUCTOS.find(
          (item) => item.id === producto.id
        );

        return {
          id: producto.id ?? producto._id,
          nombre: producto.nombre,
          categoria: producto.categoria,
          precio: producto.precio,
          imagen:
            producto.imagenUrl ||
            producto.imagenOriginal ||
            original?.imagen ||
            '',
          descripcion:
            producto.descripcion ?? original?.descripcion ?? '',
          destacado: producto.destacado ?? false,
        };
      })
      .filter(
        (producto) =>
          Boolean(producto.nombre && producto.imagen) &&
          Number.isFinite(producto.precio)
      );
  } catch (error) {
    console.error('No se pudo consultar Sanity:', error);

    // Mantener el catálogo original si Sanity no responde.
    return PRODUCTOS;
  }
}
