<!--
  Instructions for Uploading results
-->
<template>
  <Layout title="Upload Instructions">
    <vue-headful
      :head="{
        meta: { name: 'robots', content: 'all' },
      }"
      title="Munro - Upload Instructions"
      description="Instrcutions for how to upload results to Munro, the Fast and Easy Results System for Orienteering Leagues. A simple way to calculate the results for orienteering leagues, with search and sort features"
      url="https://munro-leagues.herokuapp.com/upload/instructions"
    />
    <InstructionCard :number="1">
      <template #instruction>
        Go to
        <router-link to="/upload/file" class="link text-main-700"
          >https://munro-leagues.herokuapp.com/upload/file</router-link
        >
      </template>
      <template #body>
        <img
          src="@/assets/images/UploadInstructions-EmptyFormNew.png"
          alt="Empty Upload Form"
        />
      </template>
    </InstructionCard>

    <InstructionCard :number="2">
      <template #instruction>
        Enter the Event ID and the 20 digit Upload Key Provided
      </template>
      <template #body>
        <p>
          The event name should now be displayed. You can get the Event ID and
          Upload Key from your league coordinator or by emailing
          munro.leagues@gmail.com The Event ID will be the the form
          LeagueNameEventNameYYYY-MM-DD with all spaces removed
        </p>
        <img
          src="@/assets/images/UploadInstructions-KeysEnteredNew.png"
          alt="Upload Form with Keys Entered"
        />
      </template>
    </InstructionCard>

    <InstructionCard :number="3">
      <template #instruction>
        Select Your Results File
      </template>
      <template #body>
        <p>
          This file can be an OE CSV File or SITiming Processable CSV file with
          semi-colon or comma delimiter. Or another semicolon/ comma delimited
          CSV file with the following headings, these headings can be in any
          order:
        </p>
        <code
          >Name; Age Class; Club; Course; Time; Position; Noncompetitive;
          Status;
        </code>
      </template>
    </InstructionCard>

    <InstructionCard :number="4">
      <template #instruction>
        The `Upload File` Button Should Now Appear
      </template>
      <template #body>
        <p>
          If you are re-uploading results tick the 'Overwrite Existing Results'
          checkbox
        </p>
        <img
          src="@/assets/images/UploadInstructions-ButtonShowingNew.png"
          alt="Upload Form with Upload Button Visible"
        />
      </template>
    </InstructionCard>

    <InstructionCard :number="5">
      <template #instruction>
        Enter the URLs of the Results Uploaded on Other Websites eg. HTML
        Results/ Routegadget/ Winsplits.
      </template>
      <template #body>
        <p>
          If you forget, or need to change these URLs please contact your league
          admin or munro.leagues@gmail.com who can update them
        </p>
      </template>
    </InstructionCard>

    <InstructionCard :number="6">
      <template #instruction>
        Click Upload
      </template>
      <template #body>
        <p>
          A message should appear saying that the data has been sent. Then a
          message saying that the results upload is successful should appear and
          you will be redirected to the league page
        </p>
      </template>
    </InstructionCard>

    <div class="col-span-2 card-color">
      <p class="p-1">
        If you need any help or wish to upload results in a different format
        please contact me at:
        <span class="text-lg font-heading">munro.leagues@gmail.com</span>
      </p>
    </div>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout'
import InstructionCard from '@/components/cards/InstructionCard'

export default {
  components: {
    Layout,
    InstructionCard,
  },
}
</script>
