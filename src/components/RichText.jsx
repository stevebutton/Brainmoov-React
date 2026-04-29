import { PortableText } from '@portabletext/react'

const ptComponents = {
  block: {
    normal: ({ children }) => <p className="leading-relaxed">{children}</p>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
  },
}

export default function RichText({ value, className }) {
  if (!value) return null
  if (typeof value === 'string') return <p className={className}>{value}</p>
  if (Array.isArray(value)) {
    return (
      <div className={className}>
        <PortableText value={value} components={ptComponents} />
      </div>
    )
  }
  return null
}
