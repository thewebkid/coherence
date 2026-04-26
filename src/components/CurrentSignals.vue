
<template>
  <section>
    <h2 class="text-label">Recent Signals</h2>
      <WordField :words="projectWords" :project="project" />
      <div class="pt-5 mt-5">
        <SignalFeed :entries="projectFeed" />
      </div>
  </section>
  <div class="submission-section">
    <h2>Submit an Observation</h2>
    <p>All submissions are anonymous.</p>
    <SignalSubmissionForm  :project="project" />
  </div>
</template>
<script>
import SignalSubmissionForm from '@/components/SignalSubmissionForm.vue';
import SignalFeed from '@/components/SignalFeed.vue';
import WordField from '@/components/WordField.vue';
import { initObservatoryData, getWordsForProject, getFeedForProject } from '@/utils/observatoryData';
export default {
  name: "CurrentSignals",
  computed:{
    projectWords(){
      return getWordsForProject(this.project);
    },
    projectFeed(){
      return getFeedForProject(this.project);
    }
  },
  components: {WordField, SignalFeed, SignalSubmissionForm},
  props:['project']
}
</script>

<style lang="scss">

</style>
