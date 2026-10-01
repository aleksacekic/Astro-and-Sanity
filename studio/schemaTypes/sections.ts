import {defineType, defineField, defineArrayMember} from 'sanity'

export const hero = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({name: 'heading', type: 'localeString', validation: (R) => R.required()}),
    defineField({name: 'subheading', type: 'localeText'}),
    defineField({
      name: 'image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        // alt tekst je polje NA slici, ne odvojeno polje pored nje
        defineField({
          name: 'alt',
          type: 'localeString',
          title: 'Alternative text',
          description: 'Opis slike za screen reader. Ostavi prazno ako je slika dekorativna.',
        }),
      ],
    }),
    defineField({name: 'ctaLabel', type: 'localeString', title: 'Button label'}),
    defineField({name: 'ctaHref', type: 'string', title: 'Button link'}),
  ],
  preview: {
    select: {title: 'heading.sr'},
    prepare: ({title}) => ({title: title || '(bez naslova)', subtitle: 'Hero'}),
  },
})

export const features = defineType({
  name: 'features',
  title: 'Features',
  type: 'object',
  fields: [
    defineField({name: 'heading', type: 'localeString'}),
    defineField({
      name: 'items',
      type: 'array',
      title: 'Feature items',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'feature',
          fields: [
            defineField({name: 'title', type: 'localeString', validation: (R) => R.required()}),
            defineField({name: 'text', type: 'localeText'}),
          ],
          preview: {
            select: {title: 'title.sr'},
            prepare: ({title}) => ({title: title || '(bez naslova)'}),
          },
        }),
      ],
      validation: (R) => R.min(2).max(6),
    }),
  ],
  preview: {
    select: {title: 'heading.sr'},
    prepare: ({title}) => ({title: title || 'Features', subtitle: 'Features'}),
  },
})

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'object',
  fields: [
    defineField({name: 'heading', type: 'localeString'}),
    defineField({
      name: 'questions',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'qa',
          fields: [
            defineField({name: 'question', type: 'localeString', validation: (R) => R.required()}),
            defineField({name: 'answer', type: 'localeText', validation: (R) => R.required()}),
          ],
          preview: {
            select: {title: 'question.sr'},
            prepare: ({title}) => ({title: title || '(bez pitanja)'}),
          },
        }),
      ],
      validation: (R) => R.min(1),
    }),
  ],
  preview: {
    select: {title: 'heading.sr'},
    prepare: ({title}) => ({title: title || 'FAQ', subtitle: 'FAQ'}),
  },
})

export const cta = defineType({
  name: 'cta',
  title: 'Call to action',
  type: 'object',
  fields: [
    defineField({name: 'heading', type: 'localeString', validation: (R) => R.required()}),
    defineField({name: 'text', type: 'localeText'}),
    defineField({name: 'buttonLabel', type: 'localeString', validation: (R) => R.required()}),
    defineField({name: 'buttonHref', type: 'string', validation: (R) => R.required()}),
  ],
  preview: {
    select: {title: 'heading.sr'},
    prepare: ({title}) => ({title: title || 'CTA', subtitle: 'Call to action'}),
  },
})