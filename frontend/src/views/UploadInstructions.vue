<!--
  Instructions for Uploading results
-->
<template>
  <Layout title="Upload Instructions" footer>
    <Meta
      :head="{
        meta: { name: 'robots', content: 'all' },
      }"
      title="Munro - Upload Instructions"
      description="Instructions for how to Upload Results to Munro - League Results. Sorted. Sports League Results Calculated Quick and Easily, with Results Sorting and Filtering Options"
      url="https://munro-leagues.herokuapp.com/upload/instructions"
    />
    <InstructionCard :number="1">
      <template #title>
        Go to
        <router-link to="/upload/file" class="link text-main-700">
          https://munro-leagues.herokuapp.com/upload/file
        </router-link>
      </template>
      <template #default>
        <img
          src="/@/assets/images/UploadInstructions-Blank.png"
          alt="Empty Upload Form"
        />
      </template>
    </InstructionCard>

    <InstructionCard
      :number="2"
      title="Enter the Event ID and the 20 digit Upload Key Provided"
    >
      <p>
        The event name should now be displayed.
      </p>
      <p>
        The Event ID will be the the form LeagueNameEventNameYYYY-MM-DD with all
        spaces removed.
      </p>
      <p>
        You can get the Event ID and Upload Key from your league coordinator or
        by emailing munro.leagues@gmail.com
      </p>
      <img
        src="/@/assets/images/UploadInstructions-EventDetails.png"
        alt="Upload Form with Event ID and Upload Key Included"
      />
    </InstructionCard>

    <InstructionCard :number="3" title="Select Your Results File">
      <p>
        Munro accepts any CSV results file in a sensible format, it has been
        tested with OE CSV files and SITiming Processable CSV files.
      </p>
      <p>
        It can be semicolon or comma delimited and should have the following
        headings (they can be in any order):
      </p>
      <code>
        Name; Age Class; Club; Course; Time; Position; NonCompetitive; Status;
      </code>
      <p>
        Age Class, Club, Position and NonCompetitive are optional, but are
        highly recommended to make sure the matching is done correctly
      </p>
    </InstructionCard>

    <InstructionCard :number="4" title="Enter Other Results Information">
      <p>
        Enter the URLs of the Results Uploaded on Other Websites eg. HTML
        Results/ Routegadget/ Winsplits.
      </p>
      <p>
        If you forget, or need to change these URLs please contact your league
        admin or munro.leagues@gmail.com who can update them
      </p>
      <img
        src="/@/assets/images/UploadInstructions-Complete.png"
        alt="Upload Form with Completeted with Upload Button Showing"
      />
    </InstructionCard>

    <InstructionCard :number="5" title=" Confirm if Replacing Results">
      <p>
        If results already exist a 'Overwrite Existing Results' checkbox will
        appear, to confirm you wish to replace the exisiting results, tick the
        box
      </p>
    </InstructionCard>

    <InstructionCard :number="6" title="Click `Upload File`">
      <p>
        A message should appear saying that the data has been sent. Then a
        message saying that the results upload is successful should appear and
        you will be redirected to the results table
      </p>
    </InstructionCard>

    <div class="col-span-2 card card-color">
      <p class="p-1">
        If you need any help or wish to upload results in a different format
        please contact me at:
        <span class="text-lg font-heading">munro.leagues@gmail.com</span>
      </p>
    </div>
  </Layout>
</template>

<script>
import Layout from '/@/components/Layout.vue'
import InstructionCard from '/@/components/cards/InstructionCard.vue'

export default {
  components: {
    Layout,
    InstructionCard,
  },
}
</script>
