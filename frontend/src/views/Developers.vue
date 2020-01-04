<!--
  Developers

  Has Info about API and Iframes
-->

<template>
  <div class="view">
    <vue-headful
      :head="{
        meta: { name: 'robots', content: 'all' },
      }"
      title="Munro - Developers"
      description="Developer information about the API and embed pages of Munro, the Fast and Easy Results System for Orienteering Leagues. A simple way to calculate the results for orienteering leagues, with search and sort features"
      url="https://munro-leagues.herokuapp.com/developers"
    />
    <h1 class="text-main text-3xl font-normal font-heading">Developers</h1>
    <div class="card-text mt-2 mb-4">
      <h2 class="text-2xl font-normal font-heading mb-2">API</h2>
      <p>
        All methods use a standard HTTP GET request. The event id is made by
        combining the league name, event name and date and removing all spaces,
        it is avaliable for the league admin to view. Dates are in the form
        YYYY-MM-DD
      </p>
      <h4>/api/leagues</h4>
      <p>List of all the leagues and their details</p>
      <h4>/api/leagues/{ LEAGUE NAME }</h4>
      <p>Details of a specific league</p>
      <h4>/api/leagues/{ LEAGUE NAME }/events</h4>
      <p>Events from a specific league</p>
      <h4>/api/leagues/{ LEAGUE NAME }/results/{ COURSE }</h4>
      <p>The overall league standings for a given course and league</p>
      <h4>/api/events</h4>
      <p>List of all events</p>
      <h4>/api/events/{ EVENT ID }</h4>
      <p>Details of a specific event</p>
      <h4>/api/events/{ EVENT ID }/results</h4>
      <p>Results from a specific event</p>
      <h4>/api/events/latest-results</h4>
      <p>The latest events with results</p>
      <h4>/api/competitors</h4>
      <p>List of all the competitors</p>
      <h4>/api/competitors/{ COMPETITOR ID }</h4>
      <p>A specific competitors details</p>
      <h4>/api/competitors/{ COMPETITOR ID }/results</h4>
      <p>All the events of a specific competitor</p>
      <h4>/api/results</h4>
      <p>All results</p>
    </div>
    <div class="card-text my-4">
      <h2 class="text-2xl font-normal font-heading mb-2">Embed</h2>
      <p>
        Currently there are two pages designed for embedding in Iframes. Place
        in an IFrame like:
      </p>
      <code
        >&lt;iframe
        src=&quot;https://munro-leagues.herokuapp.com/embed/leagues/Sprintelope
        2018/events&quot;&gt;&lt;/iframe&gt;</code
      >
      <h4>/embed/leagues/{ LEAGUE NAME }/events</h4>
      <p>
        Contains a list of all events in the league and links to the results
      </p>
      <h4>/embed/leagues/{ LEAGUE NAME }/results/{ COURSE }</h4>
      <p>Contains the league standings for that course</p>
    </div>
  </div>
</template>

<style scoped lang="postcss">
h4 {
  @apply font-heading text-xl my-2;
}

.card-text {
  @apply text-left items-start;
}

h1,
h2,
h4,
p {
  @apply text-left;
}

code {
  display: block;
  margin: 0.5rem 0;
  padding: 0.5rem;
  background: #eee;
}
</style>
