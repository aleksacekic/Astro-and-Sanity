import {defineType, defineField} from 'sanity'

export const LANGUAGES = [
    {id: 'sr', title: 'Serbian', isDefault: true},
    {id: 'en', title: 'English', isDefault: false},
]

export const localeString = defineType(
    {
        name: 'localeString',
        title: 'Localized String',
        type: 'object',
        options: {collapsible: true, collapsed: false},
        fields: LANGUAGES.map((lang) =>
            defineField({
                name: lang.id,
                title: lang.title,
                type: 'string',
                validation: lang.isDefault ? (Rule) => Rule.required() : undefined,
            }))
        }
)

export const localeText = defineType({
  name: 'localeText',
  title: 'Localized text',
  type: 'object',
  options: {collapsible: true, collapsed: false},
  fields: LANGUAGES.map((lang) =>
    defineField({
      name: lang.id,
      title: lang.title,
      type: 'text',
      rows: 3,
    }),
  ),
})

