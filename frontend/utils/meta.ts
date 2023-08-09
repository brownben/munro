export const useTitle = ({
  title,
  description,
}: {
  title: string
  description: string
}) => {
  title += ' - Munro'

  useSeoMeta({
    title,
    description,
  })
}
