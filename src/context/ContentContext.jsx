import { createContext, useContext, useState, useEffect } from 'react'
import { Heart, Brain, Activity, Sparkles, Target, Zap, Shield, Users } from 'lucide-react'
import { client, queries } from '../lib/sanity'

// Icons can't live in Sanity — map them by ID here
const serviceIconMap = {
  dcd: Sparkles, adhd: Target, learning: Brain, sensory: Zap, vestibular: Activity,
  concussion: Shield, migraine: Zap, balance: Activity, pain: Target, injury: Users,
  falls: Shield, stroke: Brain, parkinsons: Activity, cognitive: Sparkles, 'age-balance': Target,
  assessment: Brain, neurological: Activity, treatment: Target, monitoring: Sparkles, followup: Shield,
}

const audienceIconMap = {
  children: Heart,
  adults: Brain,
  seniors: Activity,
}

const audienceColorMap = {
  children: 'from-blue-500 to-cyan-500',
  adults: 'from-purple-500 to-pink-500',
  seniors: 'from-green-500 to-emerald-500',
}

const INFRA_INTRO = {
  title: 'Technology and Equipment',
  cards: [{ title: 'Overview', description: 'Functional neurology, indeed, sometimes requires in its general process using some high-technology devices, reliable and accurate.' }],
}

const ContentContext = createContext(null)

export function ContentProvider({ children }) {
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      client.fetch(queries.introPanels),
      client.fetch(queries.audiences),
      client.fetch(queries.conditions),
      client.fetch(queries.machines),
      client.fetch(queries.technicalServices),
      client.fetch(queries.siteSettings),
      client.fetch(queries.aboutContent),
      client.fetch(queries.whoSection),
      client.fetch(queries.whatSection),
      client.fetch(queries.processSection),
    ]).then(([
      introPanels, audiences, conditions, machines,
      technicalServices, siteSettings, aboutContent,
      whoSection, whatSection, processSection,
    ]) => {
      setContent({
        introPanels: introPanels.map(p => ({ ...p, image: p.imageUrl, desc: p.description })),
        audiences: audiences.map(a => ({
          ...a,
          icon: audienceIconMap[a.id] || Brain,
          color: audienceColorMap[a.id] || 'from-blue-500 to-cyan-500',
          services: a.services?.map(s => ({
            ...s,
            icon: serviceIconMap[s.id] || Sparkles,
          })) || [],
        })),
        conditions: conditions.length > 0 ? conditions.map(c => ({
          ...c,
          services: c.services?.map(s => ({
            ...s,
            icon: serviceIconMap[s.id] || Sparkles,
          })) || [],
        })) : null,
        // Prepend the intro object at index 0 to match existing machines[0] pattern
        machines: [INFRA_INTRO, ...machines],
        technicalServices: technicalServices.map(s => ({
          ...s,
          icon: serviceIconMap[s.id] || Brain,
        })),
        siteSettings,
        aboutContent,
        whoSection,
        whatSection,
        processSection,
      })
      setLoading(false)
    }).catch(err => {
      console.error('Failed to fetch content from Sanity:', err)
      setLoading(false)
    })
  }, [])

  return (
    <ContentContext.Provider value={{ content, loading }}>
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  return useContext(ContentContext)
}
