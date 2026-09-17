import { defineType, defineField } from 'sanity';

export const customImage = defineType({
  name: 'customImage',
  title: 'Image with Alt Text',
  type: 'image',
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: 'alt',
      title: 'Alternative Text',
      type: 'string',
      description: 'Important for accessibility and screen readers.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption / Attribution',
      type: 'string',
      description: 'Optional descriptive caption displayed beneath the image.',
    }),
  ],
});
