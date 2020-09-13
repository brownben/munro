<template>
  <Layout footer>
    <Meta
      :head="{
        meta: { name: 'robots', content: 'all' },
      }"
      title="Munro - Developers"
      description="Developer information about the API and embed pages of Munro - League Results. Sorted. Sports League Results Calculated Quick and Easily, with Results Sorting and Filtering Options"
      url="https://munro-leagues.herokuapp.com/developers"
    />

    <article class="col-span-2 w-full mx-auto mt-4 mb-auto prose lg:prose-lg">
      <h1>Developers</h1>
      <blockquote>
        <strong>Munro is Open Source!</strong>

        <span class="pl-2">
          All the Code is Avaliable on
          <a class="link" href="https://github.com/brownben/munro">Github</a>
        </span>
      </blockquote>

      <h2>API</h2>
      <p>
        All methods use a standard HTTP GET request. The event id is made by
        combining the league name, event name and date and removing all spaces,
        it is avaliable for the league admin to view. Dates are in the form
        YYYY-MM-DD
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
      <pre><code>&lt;iframe src=&quot;https://munro-leagues.herokuapp.com/embed/leagues/Sprintelope 2018/events&quot;&gt;&lt;/iframe&gt;</code></pre>
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
    </article>
  </Layout>
</template>

<script>
import Layout from '/@/components/Layout.vue'

export default {
  components: {
    Layout,
  },
}
</script>
