import groq from 'groq'

export const pageQuery = groq`
  *[_type == "page" && slug.current == $slug][0]{
    "metaDescription": metaDescription[$lang],
    sections[]{
      _type,
      _key,

      _type == "hero" => {
        "heading": heading[$lang],
        "subheading": subheading[$lang],
        "ctaLabel": ctaLabel[$lang],
        ctaHref,
        "image": image{
          "alt": alt[$lang],
          "url": asset->url,
          "width": asset->metadata.dimensions.width,
          "height": asset->metadata.dimensions.height,
          "lqip": asset->metadata.lqip
        }
      },

      _type == "features" => {
        "heading": heading[$lang],
        "items": items[]{
          _key,
          "title": title[$lang],
          "text": text[$lang]
        }
      },

      _type == "faq" => {
        "heading": heading[$lang],
        "questions": questions[]{
          _key,
          "question": question[$lang],
          "answer": answer[$lang]
        }
      },

      _type == "cta" => {
        "heading": heading[$lang],
        "text": text[$lang],
        "buttonLabel": buttonLabel[$lang],
        buttonHref
      }
    }
  }
`