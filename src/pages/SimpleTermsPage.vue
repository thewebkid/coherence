<template>
  <div class="simple-terms-page fade-in">
    <div class="page-container">
      <div class="content-container">
        <header class="page-header">
          <h1>Simple Terms</h1>
        </header>

        <div class="page-content">
          <p>We keep this simple.</p>

          <p>
            We do not sell your data.<br>
            We do not share your information with third parties.<br>
            We do not send unsolicited emails.
          </p>

          <p>
            If you choose to share your information with us, it is held with care
            and used only for the purpose it was given.
          </p>

          <p>This site is offered as a public resource.<br>
            You are welcome to explore, read, and engage with the material freely.
          </p>

          <p>
            All content is provided in good faith.<br>
            We ask that it be engaged with respectfully and not misrepresented.
          </p>

          <p>We may update this site over time as the work evolves.</p>

          <p>By using this site, you agree to these simple terms.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHead } from '@unhead/vue';

useHead({
  title: 'Simple Terms — Coherence Across Scales',
  meta: [
    { name: 'description', content: 'Simple Terms of use for Coherence Across Scales.' },
  ],
});
</script>

<style lang="scss" scoped>
.page-content {
  p {
    margin-bottom: var(--spacing-md);
    line-height: 1.75;
    &:last-child { margin-bottom: 0; }
  }
}
</style>
