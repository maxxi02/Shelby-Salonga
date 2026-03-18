import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
}

const DEFAULT_TITLE = 'Shelby Salonga — Creative Developer & Designer'
const DEFAULT_DESC = 'Creative Developer & Designer based in Manila, PH. Building precise, beautiful digital experiences at the intersection of design and code.'
const DEFAULT_URL = 'https://rojanns.vercel.app/'

export default function SEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESC,
  image,
  url = DEFAULT_URL,
}: SEOProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      {image && <meta property="og:image" content={image} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  )
}
