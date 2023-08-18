<script setup lang="ts">
useTitle({
  title: 'Scoring Methods',
  description: 'How the different scoring methods work.',
})
</script>

<template>
  <div>
    <Heading
      title="Scoring Methods"
      tagline="How the different scoring methods work."
    />

    <main
      class="mx-auto flex max-w-screen-lg flex-col gap-12 px-6 py-10 sm:grid sm:pt-10 lg:px-8"
    >
      <ScoringMethod
        id="position"
        name="Position Based Scoring"
        description="Points are assigned based on your position in the course. The winner
            gets the most, counting down by one for each place behind the
            winner. No one gets less than 0 points. Can start from different
            values (100, 99, 50)."
        :example-positions="['1st', '2nd', '3rd', '...', '99th']"
        :example-points="['100', '99', '98', '...', '1']"
      />

      <ScoringMethod
        id="position-average"
        name="Position Based Scoring (Reduced In Draw)"
        description="Points are assigned based on your position in the course. The winner
            gets the most, counting down by one for each place behind the
            winner. No one gets less than 0 points. If there is a draw the
            points assigned is the average across all positions covered."
        :example-positions="['1st', '=2nd', '=2nd', '4th', '...']"
        :example-points="['100', '98.5', '98.5', '97', '...']"
      />

      <ScoringMethod
        id="position-staggered"
        name="Position Based Scoring (Staggered)"
        description="Points are assigned based on your position in the course. The winner
            gets the most, with the first 5 places getting having larger gaps
            before counting down by 1 for each place. No one gets less than 0
            points."
        :example-positions="['1st', '2nd', '3rd', '4th', '5th', '6th']"
        :example-points="['60', '55', '51', '48', '46', '45']"
      />

      <ScoringMethod
        id="time-average"
        name="Time Relative to Average"
        description="The average time on the course is given 1000 points. If you are faster by one standard deviation of the times, you get 200 more points, and 200 less if you are slower by one standard deviation. Used for the Scottish Orienteering League. Can also have a base of 100 points."
        :example-positions="['1st', '2nd', '3rd', '4th', '5th']"
        :example-times="['10', '12', '15', '25', '65']"
        :example-points="['1135', '1117', '1091', '1003', '654']"
      />

      <ScoringMethod
        id="time-top"
        name="Time Relative to Top 3"
        description="The average time of the first 3 competitors on the course gets 1000 points. You are then assigned points based on what proportion of that average time was yours."
        :example-positions="['1st', '2nd', '3rd', '4th', '5th', '6th']"
        :example-times="['45', '50', '55', '62', '100', '150']"
        :example-points="['1111', '1000', '909', '806', '500', '330']"
      />
    </main>
  </div>
</template>
