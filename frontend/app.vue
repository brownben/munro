<template>
  <div id="app">
    <a
      href="#content"
      class="focus:shadow-outline sr-only z-50 rounded-md bg-white text-main-700 focus:not-sr-only focus:absolute focus:m-4 focus:block focus:px-3 focus:py-2 dark:bg-gray-900"
    >
      Skip to main content
    </a>
    <Menu />
    <div class="flex-grow bg-white dark:bg-gray-900">
      <NuxtPage id="content" />
    </div>
    <Footer />
  </div>
</template>
<script setup lang="ts">
const route = useRoute()

const theme = useState('theme', () => queryToString(route.query.theme))
if (import.meta.env.DEV) {
  theme.value = 'blue'
}

const themeClass = computed(() => {
  if (!theme.value || theme.value === 'purple') return ''

  const cool = ['blue', 'green', 'cyan']
  const gray = cool.includes(theme.value)
    ? 'theme-cool-gray'
    : 'theme-warm-gray'

  return `theme-${theme.value} ${gray}`
})

useHead({ htmlAttrs: { class: themeClass } })
</script>
