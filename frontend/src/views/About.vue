<template>
  <Layout>
    <Meta
      title="Munro - Introducing Munro Leagues"
      description="Why I created Munro and what it does to make league result calculation easy - League Results. Sorted. Sports League Results Calculated Quick and Easily, with Results Sorting and Filtering Options"
      url="https://munro-leagues.herokuapp.com/developers"
      :block-robots="false"
    />
    <article
      class="col-span-2 pb-2 mx-auto mt-4 mb-auto prose lg:pb-4 lg:prose-lg"
    >
      <h1>Introducing Munro Leagues</h1>

      <blockquote>
        This article was originally featured in the August Issue of Scottish
        Orienteering's Score Magazine -
        <a
          href="https://www.scottish-orienteering.org/membership/score-magazine/"
        >
          Read it Here
        </a>
      </blockquote>

      <p>
        Munro Leagues, started as part of my Advanced Higher Computing project,
        it is a league results calculator. it calculates the overall results for
        a series of events, it is designed to be easy to use and require very
        little effort for league coordinators and event organisers to use. It is
        now hosting the results for several leagues across Scotland, including:
        the Sprintelope, Northern Night Cup, Fight with the Night leagues, with
        over 125 events and almost 5000 results in the system.
      </p>

      <p>
        Munro makes viewing everything about a league easy, you can view all the
        events, dates, links to further event details and links to Routegadget
        and Winsplits to make sure you can find everything in one place. You can
        view results for all events and the overall results for the league, with
        options to sort and filter the results by name, club, age, time/ score
        allowing you to view any subset of results in what ever order you want.
        Munro is easy to use on the go, as well as looking good on all screen
        sizes; it has support for offline caching, so you can access the data
        even when you don't have a signal.
      </p>

      <figure>
        <img
          src="../assets/images/MunroOriginalDesign.png"
          alt="Original Deisgn for Munro"
        />
        <figcaption>
          The Original Design from my Advanced Higher Project
        </figcaption>
      </figure>

      <p>
        When I had to originally decide on a project for Advanced Higher
        Computing, I originally had no idea what I wanted to do; but I had just
        finished calculating the results for the Sprintelope series using a
        spreadsheet. This took quite a while, as for each event I had to process
        the results file into something suitable to work with, update the
        formulas in Excel to cope with the new event and then match all the
        stray results which hadn't been matched properly (lots of people vary
        which name they enter under), before running a script to create a
        web-page to display the results in a friendly way. This process took
        time, by the end with practice I could process the results, if there
        wasn't a problem in roughly 25 minutes, but was sometimes taking over 50
        minutes. As it was taking so long my dad suggested I could, write a
        league results calculator as part of my project.
      </p>

      <p>
        To make it as easy as possible for everyone to use and to make the
        upload process take a matter of seconds, I had to make the results file
        upload as simple as possible, therefore it takes almost any CSV (any
        file with a sensible format should work), and has been tested with the
        exports from the main results software. It matches peoples results
        automatically, and can even match when people enter under with different
        details like variations in their name (e.g. Pete and Peter), and has a
        simple admin interface to fix it in seconds when it occasionally makes a
        mistake.
      </p>

      <figure>
        <img
          src="../assets/images/MunroLaterDesign.png"
          alt="Later Design of Munro Displayed on Laptop and Mobile"
        />
        <figcaption>
          A Later Redesign which Improved the usability on Mobile
        </figcaption>
      </figure>

      <p>
        Although I created it for my Advanced Higher project, I have continued
        to add features to it. Some features I have recently added include:
        assigning manual points for event organisers, including the ability for
        it to give the organiser either their average score for the league or
        their maximum score they achieved at any event (as used in the Northern
        Night Cup) and a range of different scoring systems, including SOL style
        points, using points from a score race, and assigning double points to
        races.
      </p>

      <p>
        This summer I have also made further enhancements to allow you to manage
        "virtual" leagues using Munro, such as the (not) Sprintelope league in
        Edinburgh, where an event gets uploaded to MapRun each week. I have just
        added a way to import the results directly from MapRun, it reads the
        results file directly so there is no hassle with downloading and
        uploading files. There is also now a form for people to submit their
        result for automatic inclusion in the results if they didn't want to use
        MapRun.
      </p>

      <figure>
        <img
          src="../assets/images/MunroLatestDesign.png"
          alt="Latest Design of Munro Displayed on Laptop and Mobile"
        />
        <figcaption>The Current Design</figcaption>
      </figure>

      <p>
        For those interested in the technical details of Munro is a VueJS web
        app, querying a Python Flask API and the full source code is available
        on my GitHub at:
        <a href="https://github.com/brownben/munro">
          https://github.com/brownben/munro
        </a>
      </p>

      <p>
        Munro is still in development and if you have any feedback or questions
        about Munro, please feel free to email me at:
        <a href="mailto:munro.leagues@gmail.com">munro.leagues@gmail.com</a>
      </p>
    </article>
  </Layout>
</template>
<script setup lang="ts">
import Layout from '../components/Layout.vue'
</script>
