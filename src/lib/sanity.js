import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'lta2ho0n',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

const ptProjection = `_type, _key, style, listItem, level, markDefs[] { _type, _key, href }, children[] { _type, _key, text, marks }`

export const queries = {
  introPanels: `*[_type == "introPanel"] | order(order asc) {
    id, prefix, italicPart, nav,
    "imageUrl": imageUrl.asset->url,
    description
  }`,

  audiences: `*[_type == "audience"] | order(title asc) {
    id, title, overview,
    intro[] { ${ptProjection} },
    "backgroundImage": backgroundImage.asset->url, videoTitle,
    "services": services[] {
      _key,
      "id": coalesce(id.current, id),
      title,
      description[] { _type, _key, style, listItem, level, markDefs[] { _type, _key, href }, children[] { _type, _key, text, marks } },
      "cards": cards[] { title, description }
    }
  }`,

  machines: `*[_type == "machine"] | order(order asc) {
    title, "imageUrl": imageUrl.asset->url, videoUrl, order,
    overview,
    content[] { ${ptProjection} }
  }`,

  technicalServices: `*[_type == "technicalService"] | order(order asc) {
    id, title, description,
    hoverDescription[] { ${ptProjection} },
    order
  }`,

  conditions: `*[_type == "condition"] | order(order asc, title asc) {
    id, title, order,
    panelTitle,
    "panelImage": panelImage.asset->url,
    panelDescription,
    intro[] { ${ptProjection} },
    "services": services[] {
      _key,
      "id": coalesce(id.current, id),
      title,
      description[] { _type, _key, style, listItem, level, markDefs[] { _type, _key, href }, children[] { _type, _key, text, marks } },
      "cards": cards[] { title, description }
    }
  }`,

  siteSettings: `*[_type == "siteSettings"][0] {
    navHome, navWho, navWhat, navInfrastructure, navProcess, navTreatmentFinder,
    uiApproaches, uiOurProcess, uiSelectApproach,
    uiOurServices, uiSelectService,
    uiOurEquipment, uiSelectEquipment,
    uiOurTreatmentProcess,
    btnFindOutMore, btnLearnMore, btnExplorePrograms, btnWatchVideo, btnPauseVideo
  }`,

  whoSection: `*[_type == "whoSection"][0] {
    heading, headingItalic,
    intro[] { ${ptProjection} }
  }`,

  whatSection: `*[_type == "whatSection"][0] {
    heading, headingItalic,
    intro[] { ${ptProjection} }
  }`,

  processSection: `*[_type == "processSection"][0] {
    heading, headingItalic,
    intro[] { ${ptProjection} }
  }`,

  aboutContent: `*[_type == "aboutContent"][0] {
    tabWhatIs, tabPhilosophy, tabObjectives, tabTeam, tabInfrastructure, tabHistory,
    landingPanels[] { id, prefix, italic, description },
    philosophy { heading, body[] { ${ptProjection} } },
    objectives { heading, body[] { ${ptProjection} } },
    team { heading, body[] { ${ptProjection} } },
    history { heading, body[] { ${ptProjection} } },
    infrastructure { heading }
  }`,
}
