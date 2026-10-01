import groq from 'groq'

export const pageQuery = groq`
  *[_type == "page" && slug.current == $slug][0]{
    "title": title,
    "metaDescription": metaDescription[$lang],
    sections[]{
      _type,
      _key,
      ...
    }
  }
`