import {defineType, defineField, defineArrayMember} from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Internal title',
      description: 'Samo za snalaženje u Studiju, ne prikazuje se na sajtu.',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'metaDescription',
      type: 'localeText',
      description: 'Za <meta name="description"> i rezultate pretrage.',
    }),
    defineField({
      name: 'sections',
      title: 'Page sections',
      type: 'array',
      of: [
        defineArrayMember({type: 'hero'}),
        defineArrayMember({type: 'features'}),
        defineArrayMember({type: 'faq'}),
        defineArrayMember({type: 'cta'}),
      ],
    }),
  ],
})