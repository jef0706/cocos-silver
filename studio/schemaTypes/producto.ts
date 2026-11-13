
import { defineField, defineType } from 'sanity';

export const productoType = defineType({
  name: 'producto',
  title: 'Productos de Cocos Silver',
  type: 'document',

  fields: [
    defineField({
      name: 'nombre',
      title: 'Nombre del producto',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'categoria',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          'Anillos',
          'Aretes',
          'Collares',
          'Gargantillas',
          'Dijes',
          'Pulseras',
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'precio',
      title: 'Precio en quetzales',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: 'imagen',
      title: 'Fotografía del producto',
      type: 'image',
      options: { hotspot: true },
    }),

    defineField({
      name: 'descripcion',
      title: 'Descripción',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'destacado',
      title: 'Producto destacado',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'disponible',
      title: 'Disponible para la venta',
      type: 'boolean',
      initialValue: true,
    }),

    // Campos de compatibilidad con el catálogo actual.
    defineField({
      name: 'id',
      title: 'ID anterior',
      type: 'number',
      hidden: true,
    }),

    defineField({
      name: 'imagenOriginal',
      title: 'Ruta de fotografía anterior',
      type: 'string',
      hidden: true,
    }),
  ],

  preview: {
    select: {
      title: 'nombre',
      subtitle: 'categoria',
      media: 'imagen',
    },
  },
});
