export const useTitle = ({
  title,
  description,
}: {
  title: string
  description: string
}) => {
  title += ' - Munro'

  useHead({
    title,
    meta: [
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
    ],
  })
}
