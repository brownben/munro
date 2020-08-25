<!--
  League Form

  The form for Creating/ Updating Leagues

  On Create:
    - Show form

  On Edit:
    - Show Form
    - Fetch league data and display it (League Name from URL)
-->

<template>
  <div>
    <Meta
      :head="{
        meta: { name: 'robots', content: 'noindex' },
      }"
      :title="`Munro - ${title}`"
      description
    />

    <Layout v-if="!notFound" :title="title">
      <form class="col-span-2" @submit.prevent="submit">
        <TextInput v-model.trim="name" label="Name:" />
        <number-input
          v-model.number="year"
          label="Year:"
          :max="2050"
          class="mt-4"
        />
        <TextInput
          v-model.trim="description"
          label="Description:"
          class="mt-4"
        />
        <TextInput
          v-model.trim="website"
          label="Website: (URL)"
          type="url"
          class="mt-4"
        />
        <TextInput
          v-model.trim="coordinator"
          label="Coordinator:"
          class="mt-4"
        />
        <DropdownInput
          v-model="scoringMethod"
          :list="[
            'Position Based (100 Max)',
            'Position Based (99 Max)',
            'Position Based (50 Max)',
            'Position Based (100 Max, Double Points)',
            'Position Based (50 Max, Double Points)',
            'Position Based (99 Max, Reduced in a Draw)',
            'Relative to Average Time (1000 Average)',
            'Relative to Average Time (100 Average)',
            'From Upload File',
          ]"
          label="Scoring Method:"
          class="mt-4"
        />
        <number-input
          v-model.number="numberOfCountingEvents"
          :min="1"
          label="Number of Events to Count:"
          class="mt-4"
        />
        <TextInput
          v-model.trim="courses"
          label="Courses: (Comma Separated)"
          class="mt-4"
        />
        <TextareaInput
          v-model.trim="moreInformation"
          label="More Information:"
          class="mt-4"
        />
        <button v-if="create" class="mt-8 button-lg">Create League</button>
        <button v-else class="mt-8 button-lg">Update League</button>
      </form>
    </Layout>
    <not-found v-else />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import axios from 'axios'

import Layout from '/@/components/Layout.vue'
import DropdownInput from '/@/components/inputs/DropdownInput.vue'
import TextInput from '/@/components/inputs/TextInput.vue'
import TextareaInput from '/@/components/inputs/TextareaInput.vue'
import NumberInput from '/@/components/inputs/NumberInput.vue'

const NotFound = defineAsyncComponent(() => import('/@/views/NotFound.vue'))

export default {
  components: {
    Layout,
    DropdownInput,
    TextInput,
    TextareaInput,
    NumberInput,
    NotFound,
  },

  data: function () {
    return {
      notFound: false,
      create: true,
      oldName: '',
      name: '',
      year: 2000,
      website: '',
      coordinator: '',
      scoringMethod: '',
      numberOfCountingEvents: 1,
      courses: '',
      description: '',
      moreInformation: '',
      numberOfEvents: 0,
      dynamicResults: true,
    }
  },

  computed: {
    title: function () {
      if (this.create) return 'Create League'
      else return 'Edit League'
    },
  },

  // On Load
  mounted: function () {
    if (this.$route.path.includes('edit')) {
      this.create = false
      this.getLeagueDetails()
    }
  },

  methods: {
    validateForm: function () {
      if (this.name === '' || this.scoringMethod === '') {
        this.$store.dispatch(
          'createMessage',
          'Please Ensure Name and Scoring Method Fields are not Blank'
        )
        return false
      } else if (this.name.includes('/') || this.name.includes('\\')) {
        this.$store.dispatch(
          'createMessage',
          "Please Ensure Name doesn't Include any Slashes"
        )
        return false
      } else return true
    },

    returnToLeaguePage: function (response) {
      this.$store.dispatch('createMessage', response.data.message)
      this.$router.push(`/leagues/${this.name}`)
    },

    // Scoring Method is stored in a shorthand form in database, transfer between these two forms so it is displayed in a clear manner
    scoringMethodShorthandToFull: (value) => {
      if (value === 'position') return 'Position Based (100 Max)'
      else if (value === 'position50') return 'Position Based (50 Max)'
      else if (value === 'position99') return 'Position Based (99 Max)'
      else if (value === 'position99average')
        return 'Position Based (99 Max, Reduced in a Draw)'
      else if (value === 'positionDouble')
        return 'Position Based (100 Max, Double Points)'
      else if (value === 'position50Double')
        return 'Position Based (50 Max, Double Points)'
      else if (value === 'timeAverage')
        return 'Relative to Average Time (1000 Average)'
      else if (value === 'timeAverage100')
        return 'Relative to Average Time (100 Average)'
      else if (value === 'file') return 'From Upload File'
      else return ''
    },

    scoringMethodFullToShorthand: (value) => {
      if (value === 'Position Based (100 Max)') return 'position'
      else if (value === 'Position Based (50 Max)') return 'position50'
      else if (value === 'Position Based (99 Max)') return 'position99'
      else if (value === 'Position Based (99 Max - Reduced in a Draw)')
        return 'position99average'
      else if (value === 'Position Based (100 Max, Double Points)')
        return 'positionDouble'
      else if (value === 'Position Based (50 Max, Double Points)')
        return 'position50Double'
      else if (value === 'Relative to Average Time (1000 Average)')
        return 'timeAverage'
      else if (value === 'Relative to Average Time (100 Average)')
        return 'timeAverage100'
      else if (value === 'From Upload File') return 'file'
      return ''
    },

    getLeagueDetails: function () {
      return axios
        .get(`/api/leagues/${this.$route.params.name}`)
        .then((response) => {
          if (!response.data) this.notFound = true
          else {
            this.oldName = response.data.name
            this.name = response.data.name
            this.year = response.data.year
            this.website = response.data.website
            this.coordinator = response.data.coordinator
            this.scoringMethod = this.scoringMethodShorthandToFull(
              response.data.scoringMethod
            )
            this.numberOfCountingEvents = response.data.numberOfCountingEvents
            if (response.data.courses)
              this.courses = response.data.courses.join(',')
            this.description = response.data.description
            this.dynamicResults = response.data.dynamicEventResults ?? true
            this.moreInformation = response.data.moreInformation.replace(
              /\|\s*/g,
              '\n'
            )
          }
        })
        .catch(() =>
          this.$store.dispatch(
            'createMessage',
            'Problem Fetching League Details'
          )
        )
    },

    submit: function () {
      if (this.create) this.createLeague()
      else this.updateLeague()
    },

    createLeague: function () {
      if (this.validateForm()) {
        return axios
          .post('/api/leagues', {
            name: this.name,
            year: this.year,
            website: this.website,
            coordinator: this.coordinator,
            scoringMethod: this.scoringMethodFullToShorthand(
              this.scoringMethod
            ),
            numberOfCountingEvents: this.numberOfCountingEvents,
            courses: this.courses,
            description: this.description,
            dynamicEventResults: this.dynamicResults,
            moreInformation: this.moreInformation.replace(/\n/g, '|'),
          })
          .then((response) => this.returnToLeaguePage(response))
          .catch(() =>
            this.$store.dispatch(
              'createMessage',
              'Error: Problem Creating League - Please Try Again'
            )
          )
      }
    },

    updateLeague: function () {
      if (this.validateForm()) {
        return axios
          .put(`/api/leagues/${this.oldName}`, {
            oldName: this.oldName,
            name: this.name,
            year: this.year,
            website: this.website,
            coordinator: this.coordinator,
            scoringMethod: this.scoringMethodFullToShorthand(
              this.scoringMethod
            ),
            numberOfCountingEvents: this.numberOfCountingEvents,
            courses: this.courses,
            description: this.description,
            dynamicEventResults: this.dynamicResults,
            moreInformation: this.moreInformation.replace(/\n/g, '|'),
          })
          .then((response) => this.returnToLeaguePage(response))
          .catch(() =>
            this.$store.dispatch(
              'createMessage',
              'Error: Problem Updating League - Please Try Again'
            )
          )
      }
    },
  },
}
</script>
