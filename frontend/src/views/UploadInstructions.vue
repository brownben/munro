<!--
  Instructions for Uploading results
-->
<template>
  <Layout footer>
    <Meta
      :head="{
        meta: { name: 'robots', content: 'all' },
      }"
      title="Munro - Upload Instructions"
      description="Instructions for how to Upload Results to Munro - League Results. Sorted. Sports League Results Calculated Quick and Easily, with Results Sorting and Filtering Options"
      url="https://munro-leagues.herokuapp.com/upload/instructions"
    />
    <article
      class="col-span-2 pb-4 w-full mx-auto mt-4 mb-auto prose lg:pb-8 lg:prose-lg"
    >
      <h1>Upload Instructions</h1>
      <ol>
        <li>
          <strong
            >Go to
            <router-link to="/upload/file" class="link text-main-700">
              https://munro-leagues.herokuapp.com/upload/file
            </router-link></strong
          >
          <img
            src="/@/assets/images/UploadInstructions-Blank.png"
            alt="Empty Upload Form"
          />
        </li>
        <li>
          <strong
            >Enter the Event ID and the 20 digit Upload Key Provided</strong
          >
          <p>The event name should now be displayed.</p>
          <p>
            The Event ID will be the the form LeagueNameEventNameYYYY-MM-DD with
            all spaces removed.
          </p>
          <p>
            You can get the Event ID and Upload Key from your league coordinator
            or by emailing munro.leagues@gmail.com
          </p>
          <img
            src="/@/assets/images/UploadInstructions-EventDetails.png"
            alt="Upload Form with Event ID and Upload Key Included"
          />
        </li>
        <li>
          <strong>Select Your Results File</strong>
          <p>
            Munro accepts any CSV results file in a sensible format, it has been
            tested with OE CSV files and SITiming Processable CSV files.
          </p>
          <p>
            It can be semicolon or comma delimited and should have the following
            headings (they can be in any order):
          </p>
          <pre><code>Name; Age Class; Club; Course; Time; Position; NonCompetitive; Status;</code></pre>
          <p>
            Age Class, Club, Position and NonCompetitive are optional, but are
            highly recommended to make sure the matching is done correctly
          </p>
        </li>
        <li>
          <strong>Enter Other Results Information</strong>
          <p>
            Enter the URLs of the Results Uploaded on Other Websites eg. HTML
            Results/ Routegadget/ Winsplits.
          </p>
          <p>
            If you forget, or need to change these URLs please contact your
            league admin or munro.leagues@gmail.com who can update them
          </p>
          <img
            src="/@/assets/images/UploadInstructions-Complete.png"
            alt="Upload Form with Completeted with Upload Button Showing"
          />
        </li>
        <li>
          <strong>Confirm if Replacing Results</strong>
          <p>
            If results already exist a 'Overwrite Existing Results' checkbox
            will appear, to confirm you wish to replace the exisiting results,
            tick the box
          </p>
        </li>
        <li>
          <strong>Click `Upload File`</strong>
          <p>
            A message should appear saying that the data has been sent. Then a
            message saying that the results upload is successful should appear
            and you will be redirected to the results table
          </p>
        </li>
      </ol>
      <hr />
      <p>
        If you need any help or wish to upload results in a different format
        please contact me at:
        <strong>munro.leagues@gmail.com</strong>
      </p>
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
