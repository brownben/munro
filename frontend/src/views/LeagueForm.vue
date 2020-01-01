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
  <div class="view">
    <vue-headful
      v-if="create"
      title="Munro - Create League"
      description
      :head="{
        'meta': {name: 'robots', content:'noindex'},
      }"
    />
    <vue-headful
      v-else
      title="Munro - Edit League"
      description
      :head="{
        'meta': {name: 'robots', content:'noindex'},
      }"
    />
    <div v-if="!notFound">
      <h1 v-if="create" class="text-main text-3xl font-normal font-heading mb-2">Create League</h1>
      <h1 v-if="!create" class="text-main text-3xl font-normal font-heading mb-2">Edit League</h1>
      <form @submit.prevent="submit">
        <text-input v-model.trim="name" label="Name:" />
        <text-input v-model.trim="year" label="Year:" />
        <text-input v-model.trim="info" label="Description:" />
        <text-input v-model.trim="website" label="Website: (URL)" type="url" />
        <text-input v-model.trim="logo" label="Logo: (URL)" type="url" />
        <text-input v-model.trim="coordinator" label="Coordinator:" />
        <dropdown-input
          v-model="scoringMethod"
          :list="[
            'Position Based (100 Max)',
            'Position Based (50 Max)',
            'Position Based (99 Max)',
          ]"
          label="Scoring Method:"
        />
        <number-input
          v-model.number="numberOfCountingEvents"
          :min="1"
          label="Number of Events to Count:"
        />
        <text-input v-model.trim="courses" label="Courses: (Comma Separated)" />
        <button v-if="create" class="button-lg">Create League</button>
        <button v-if="!create" class="button-lg">Update League</button>
      </form>
    </div>
    <not-found v-if="notFound" />
  </div>
</template>

<script>
import axios from 'axios'
import DropdownInput from '@/components/DropdownInput'
import TextInput from '@/components/TextInput'
import NumberInput from '@/components/NumberInput'
const NotFound = () => import('@/views/NotFound')

export default {
  components: {
    'NotFound': NotFound,
    'DropdownInput': DropdownInput,
    'TextInput': TextInput,
    'NumberInput': NumberInput,
  },

  data: function () {
    return {
      notFound: false,
      create: true,
      oldName: '',
      name: '',
      year: '',
      website: '',
      logo: '',
      coordinator: '',
      scoringMethod: '',
      numberOfCountingEvents: 1,
      courses: '',
      info: '',
      numberOfEvents: 0,
    }
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
        this.$messages.addMessage('Please Ensure Name and Scoring Method Fields are not Blank')
        return false
      }
      else if (this.name.includes('/') || this.name.includes('\\')) {
        this.$messages.addMessage('Please Ensure Name doesn\'t Include any Slashes')
        return false
      }
      else return true
    },

    returnToLeaguePage: function (response) {
      this.$messages.addMessage(response.data.message)
      this.$router.push('/leagues/' + this.name)
    },

    // Scoring Method is stored in a shorthand form in database, transfer between these two forms so it is displayed in a clear manner
    scoringMethodShorthandToFull: value => {
      if (value === 'position') return 'Position Based (100 Max)'
      else if (value === 'position50') return 'Position Based (50 Max)'
      else if (value === 'position99') return 'Position Based (99 Max)'
      else if (value === 'position99average') return 'Position Based (99 Max - Reduced in a Draw)'
      else return ''
    },

    scoringMethodFullToShorthand: value => {
      if (value === 'Position Based (100 Max)') return 'position'
      else if (value === 'Position Based (50 Max)') return 'position50'
      else if (value === 'Position Based (99 Max)') return 'position99'
      else if (value === 'Position Based (99 Max - Reduced in a Draw)') return 'position99average'
      return ''
    },

    getLeagueDetails: function () {
      return axios.get('/api/leagues/' + this.$route.params.name)
        .then(response => {
          if (!response.data) this.notFound = true
          else {
            this.oldName = response.data.name
            this.name = response.data.name
            this.year = response.data.year
            this.website = response.data.website
            this.coordinator = response.data.coordinator
            this.scoringMethod = this.scoringMethodShorthandToFull(response.data.scoringMethod)
            this.numberOfCountingEvents = response.data.numberOfCountingEvents
            this.logo = response.data.logo
            if (response.data.courses) this.courses = response.data.courses.join(',')
            this.info = response.data.description
          }
        })
        .catch(() => this.$messages.addMessage('Problem Fetching League Details'))
    },

    submit: function () {
      if (this.create) this.createLeague()
      else this.updateLeague()
    },

    createLeague: function () {
      if (this.validateForm()) {
        return axios.post('/api/leagues', {
          name: this.name,
          year: this.year,
          website: this.website,
          logo: this.logo,
          coordinator: this.coordinator,
          scoringMethod: this.scoringMethodFullToShorthand(this.scoringMethod),
          numberOfCountingEvents: this.numberOfCountingEvents,
          courses: this.courses,
          description: this.info,
        })
          .then(response => this.returnToLeaguePage(response))
          .catch(() => this.$messages.addMessage('Error: Problem Creating League - Please Try Again'))
      }
    },

    updateLeague: function () {
      if (this.validateForm()) {
        return axios.put('/api/leagues/' + this.oldName, {
          oldName: this.oldName,
          name: this.name,
          year: this.year,
          website: this.website,
          logo: this.logo,
          coordinator: this.coordinator,
          scoringMethod: this.scoringMethodFullToShorthand(this.scoringMethod),
          numberOfCountingEvents: this.numberOfCountingEvents,
          courses: this.courses,
          description: this.info,
        })
          .then(response => this.returnToLeaguePage(response))
          .catch(() => this.$messages.addMessage('Error: Problem Updating League - Please Try Again'))
      }
    },
  },
}

</script>
<style  scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
