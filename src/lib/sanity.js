import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'lta2ho0n',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

export const queries = {
  introPanels: `*[_type == "introPanel"] | order(order asc) {
    id, prefix, italicPart, nav, imageUrl, description
  }`,

  audiences: `*[_type == "audience"] | order(title asc) {
    id, title, intro, backgroundImage, videoTitle,
    "services": services[] {
      "id": id.current,
      title,
      "cards": cards[] { title, description }
    }
  }`,

  machines: `*[_type == "machine"] | order(order asc) {
    title, imageUrl, videoUrl, order,
    "cards": cards[] { title, description }
  }`,

  technicalServices: `*[_type == "technicalService"] | order(order asc) {
    id, title, description, order
  }`,
}
