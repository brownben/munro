<template>
  <Layout>
    <Meta
      title="Munro - Developers"
      description="Developer information about the API and embed pages of Munro - League Results. Sorted. Sports League Results Calculated Quick and Easily, with Results Sorting and Filtering Options"
      url="https://munroleagues.com/developers"
      :block-robots="false"
    />
    <article class="w-full col-span-2 mx-auto mt-4 mb-auto prose lg:prose-lg">
      <h1>Developers</h1>
      <blockquote>
        <strong>Munro is Open Source!</strong>

        <span class="pl-2">
          All the Code is Available on
          <a class="link" href="https://github.com/brownben/munro">Github</a>
        </span>
      </blockquote>

      <h2>API</h2>
      <p>
        All leagues, events, and results are able to be accessed through Munro's
        API to allow you to create your own applications/ statistics based on
        the data in Munro. Full Swagger documentation is available
        <a href="https://munro-leagues-production.up.railway.app/api">
          to view here </a
        >. (You may need to do a hard refresh to view the page)
      </p>
      <p>Alternatively a summary of the main API routes are available below.</p>
      <h3>Basic Overview of API Methods</h3>
      <p>
        The event id is made by combining the league name, event name and date
        and removing all spaces, it is available for the league admin to view.
        Dates are in the form YYYY-MM-DD
      </p>
      <ul>
        <li>
          <strong>/api/leagues</strong>
          <p>List of all the leagues and their details</p>
        </li>
        <li>
          <strong>/api/leagues/{ LEAGUE NAME }</strong>
          <p>Details of a specific league</p>
        </li>
        <li>
          <strong>/api/leagues/{ LEAGUE NAME }/events</strong>
          <p>Events from a specific league</p>
        </li>
        <li>
          <strong>/api/leagues/{ LEAGUE NAME }/results/{ COURSE }</strong>
          <p>The overall league standings for a given course and league</p>
        </li>
        <li>
          <strong>/api/events</strong>
          <p>List of all events</p>
        </li>
        <li>
          <strong>/api/events/{ EVENT ID }</strong>
          <p>Details of a specific event</p>
        </li>
        <li>
          <strong>/api/events/{ EVENT ID }/results</strong>
          <p>Results from a specific event</p>
        </li>
        <li>
          <strong>/api/events/latest-results</strong>
          <p>The latest events with results</p>
        </li>
        <li>
          <strong>/api/competitors</strong>
          <p>List of all the competitors</p>
        </li>
        <li>
          <strong>/api/competitors/{ COMPETITOR ID }</strong>
          <p>A specific competitors details</p>
        </li>
        <li>
          <strong>/api/competitors/{ COMPETITOR ID }/results</strong>
          <p>All the events of a specific competitor</p>
        </li>
        <li>
          <strong>/api/results</strong>
          <p>All results</p>
        </li>
      </ul>
      <h2>Embed</h2>
      <p>
        Currently there are two pages designed for embedding in Iframes. Place
        in an iFrame like:
      </p>
      <pre><code>&lt;iframe src=&quot;https://munroleagues.com/embed/leagues/Sprintelope 2018/events&quot;&gt;&lt;/iframe&gt;</code></pre>
      <ul>
        <li>
          <strong>/embed/leagues/{ LEAGUE NAME }/events</strong>
          <p>
            Contains a list of all events in the league and links to the results
          </p>
        </li>
        <li>
          <strong>/embed/leagues/{ LEAGUE NAME }/results/{ COURSE }</strong>
          <p>Contains the league standings for that course</p>
        </li>
      </ul>

      <h3>Themes</h3>
      <p>
        The colour theme of the embed can be changed to match your sites colour
        theme, by adding a theme parameter to the URL.
      </p>
      <p>The following themes are available:</p>
      <ul>
        <li v-for="color of colors">{{ color }}</li>
      </ul>
      <p>For example to view a red theme:</p>
      <pre><code>&lt;iframe src=&quot;https://munroleagues.com/embed/leagues/Sprintelope 2018/events?theme=red&quot;&gt;&lt;/iframe&gt;</code></pre>

      <h2>Preview Themes</h2>

      <div class="grid grid-cols-2 gap-6 md:grid-cols-3">
        <button
          v-for="color in colors"
          class="flex items-end justify-start w-full h-24 p-2 transition-all ring-offset-2 rounded-shape hover:ring focus:ring"
          :class="color"
          @click="changeTheme(color)"
        >
          <span class="leading-tight text-white font-heading">{{ color }}</span>
        </button>
      </div>
    </article>
  </Layout>
</template>

<script setup lang="ts">
import Layout from '../components/Layout.vue'
import setTheme from '../setThemes'

const changeTheme = (theme: string) => {
  const color = setTheme(theme)
  const metaTag = document.querySelector(
    '[name="theme-color"]'
  ) as HTMLMetaElement
  metaTag.content = color
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
</script>

<style>
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
