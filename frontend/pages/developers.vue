<script setup lang="ts">
const theme = useState('theme')
const changeTheme = (color: string) => {
  theme.value = color
}
const colors = [
  'purple',
  'blue',
  'green',
  'red',
  'orange',
  'cyan',
  'pink',
  'gray',
]

useTitle({
  title: 'Developers',
  description: 'Developer information about the API',
})
</script>

<template>
  <div>
    <Heading title="Developers">
      <template #description>
        <strong class="block pb-2 font-medium sm:inline">
          Munro is Open Source!
        </strong>
        All the code is available on
        <a
          class="text-main-700 underline"
          href="https://github.com/brownben/munro"
        >
          GitHub
        </a>
      </template>
    </Heading>
    <main class="mx-auto max-w-screen-lg px-6 py-8 sm:py-10 sm:pb-16 lg:px-8">
      <article class="prose lg:prose-lg">
        <h2 class="font-black tracking-tight">API</h2>
        <p>
          All leagues, events, and results are able to be accessed through
          Munro's API to allow you to create your own applications/ statistics
          based on the data in Munro. Full Swagger documentation is available
          <a href="https://munro.up.railway.app/docs">to view here</a>. (You may
          need to do a hard refresh to view the page)
        </p>

        <h2>Themes</h2>
        <p>
          The colour theme of the site can be changed to match your sites colour
          theme, by adding a theme parameter to the URL.
        </p>
        <p>The following themes are available:</p>
        <ul>
          <li v-for="color of colors" :key="color">{{ color }}</li>
        </ul>
        <p>For example to view a red theme:</p>
        <pre><code>https://munroleagues.com/leagues/Sprintelope 2018/events?theme=red</code></pre>

        <h2 class="font-black tracking-tight">Preview Themes</h2>

        <div class="grid grid-cols-2 gap-6 md:grid-cols-3">
          <button
            v-for="color in colors"
            :key="color"
            class="flex h-24 w-full items-end justify-start rounded-md p-2 ring-offset-2 transition-all hover:ring focus:ring"
            :class="color"
            @click="changeTheme(color)"
          >
            <span class="font-medium leading-tight text-white">
              {{ color }}
            </span>
          </button>
        </div>
      </article>
    </main>
  </div>
</template>

<style scoped>
.purple {
  --tw-ring-color: #c026d3;
  background-color: #c026d3;
}
.blue {
  --tw-ring-color: #0284c7;
  background-color: #0284c7;
}
.green {
  --tw-ring-color: #16a34a;
  background-color: #16a34a;
}
.red {
  --tw-ring-color: #dc2626;
  background-color: #dc2626;
}
.orange {
  --tw-ring-color: #ea580c;
  background-color: #ea580c;
}
.cyan {
  --tw-ring-color: #0d9488;
  background-color: #0d9488;
}
.pink {
  --tw-ring-color: #db2777;
  background-color: #db2777;
}
.gray {
  --tw-ring-color: #475569;
  background-color: #475569;
}
</style>
