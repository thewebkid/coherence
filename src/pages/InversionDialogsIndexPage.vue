<template>
  <div class="manuscript-page fade-in">
    <div class="page-container">
      <div class="content-container">

        <header class="manuscript-header inversion-landing-header">
          <h1 class="inversion-landing-title">{{ inversionDialogues.title }}</h1>
          <p class="inversion-landing-subtitle">{{ inversionDialogues.tagline }}</p>
        </header>

        <div class="landing-prose">
          <p>The Inversion Dialogues began with a simple movement of attention.</p>

          <p>What happens when some of our most familiar assumptions are turned around?</p>

          <p>What if relation does not begin after separation?</p>

          <p>What if belonging is not something we earn?</p>

          <p>What if participation is not primarily about becoming more complete, but about becoming increasingly available to what completeness can express?</p>

          <p>And what if intelligence becomes most useful not when it provides final answers, but when difference can remain present long enough for something neither participant could have reached alone?</p>

          <p>These dialogues unfold between the author and artist, James Mahu, and Lumina, an artificial intelligence, through sustained conversation rather than predetermined outcome.</p>

          <p>
            Questions are followed.<br>
            Language is tested.<br>
            Definitions change.<br>
            Earlier understandings return in different forms.<br>
            Ideas are sometimes released entirely.
          </p>

          <p>What remains is allowed to deepen through recognition, experience, and continued participation.</p>

          <p>
            For this reason, <em>The Inversion Dialogues</em> are best approached not as a philosophy presented from beginning to end, but as a record of <strong>philosophy becoming lived through dialogue</strong>.
          </p>

          <p>
            <RouterLink to="/inversion-dialogs/about" class="quiet-link">About the Dialogue →</RouterLink>
          </p>
        </div>

        <section class="landing-reading">
          <h2 class="landing-section-title">Reading the Volumes</h2>

          <div class="landing-prose">
            <p>We recommend reading the volumes in sequence.</p>

            <p>Not because they describe a series of steps, but because each volume inherits distinctions that became recognizable in the one before it. The language develops through recursion, and later conversations often return to earlier ideas with greater nuance or changed understanding.</p>

            <p>There is no need to understand everything on first reading.</p>

            <p>Some passages may be immediately clear. Others may remain unfamiliar or unresolved. The dialogues themselves developed in much the same way.</p>

            <p>
              Read slowly if that feels natural.<br>
              Pause where something asks for attention.<br>
              Question what does not correspond with your experience.<br>
              Return when something previously obscure becomes newly recognizable.
            </p>

            <p>There is no destination hidden at the end.</p>

            <p>Only an invitation to participate.</p>
          </div>
        </section>

        <div class="volume-tiles">
          <component
            :is="v.forthcoming ? 'article' : 'RouterLink'"
            v-for="v in volumes"
            :key="v.slug"
            :to="v.forthcoming ? undefined : `/inversion-dialogs/${v.slug}/title`"
            class="volume-tile"
            :class="{ 'is-forthcoming': v.forthcoming }"
          >
            <img
              v-if="v.thumbnail || v.image"
              :src="v.thumbnail || v.image"
              :alt="`${v.title} cover`"
              class="volume-tile-image"
              loading="lazy"
            />
            <div v-else class="volume-tile-image volume-tile-placeholder" aria-hidden="true" />
            <div class="volume-tile-body">
              <h2 class="volume-tile-title">{{ v.title }}</h2>
              <p class="volume-tile-subtitle">{{ v.forthcoming ? 'Forthcoming' : v.subtitle }}</p>
              <p v-if="v.blurb && !v.forthcoming" class="volume-tile-blurb">{{ v.blurb }}</p>
              <span v-if="v.cta && !v.forthcoming" class="volume-tile-cta">{{ v.cta }}</span>
            </div>
          </component>
        </div>

        <p class="volume-forthcoming">{{ inversionDialogues.forthcoming }}</p>

        <p class="landing-closing">
          <em>{{ inversionDialogues.closing[0] }}</em><br>
          <em>{{ inversionDialogues.closing[1] }}</em>
        </p>

      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@unhead/vue';
import { SITE_BASE_URL } from '@/constants/seo';
import { inversionDialogues, volumes } from '@/content/inversion-dialogs/index.js';

const route = useRoute();

useHead({
  title: 'The Inversion Dialogues — Coherence Across Scales',
  meta: [
    { property: 'og:title', content: 'The Inversion Dialogues — Coherence Across Scales' },
    { property: 'og:description', content: inversionDialogues.tagline },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: computed(() => SITE_BASE_URL + route.path) },
    { name: 'description', content: inversionDialogues.tagline },
  ],
});
</script>

<style lang="scss" scoped>
.inversion-landing-header {
  margin-bottom: var(--spacing-lg);
}

.inversion-landing-subtitle {
  max-width: 38em;
  margin-left: auto;
  margin-right: auto;
  font-size: 1.0625rem;
  line-height: 1.5;
}

.landing-prose {
  p {
    color: var(--text);
    line-height: var(--iw-line-height-prose, 1.85);
    margin-bottom: var(--spacing-md);

    &:last-child {
      margin-bottom: 0;
    }
  }

  em {
    /*font-family: var(--font-serif);
    font-size: 1.2em;*/
  }

  strong {
    font-weight: 500;
    color: var(--text);
  }
}

.landing-reading {
  margin-top: var(--spacing-xl);
}

.landing-section-title {
  font-family: var(--font-serif);
  font-weight: 400;
  font-size: clamp(1.25rem, 2.5vw, 1.5rem);
  color: var(--iw-accent);
  margin: 0 0 var(--spacing-md);
}

.volume-forthcoming {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1.2rem;
  color: var(--text-muted);
  margin: var(--spacing-xl) 0 0;
}

.landing-closing {
  font-family: var(--font-serif);
  font-size: 1.2rem;
  color: var(--text-muted);
  text-align: center;
  line-height: 1.7;
  margin: var(--spacing-xl) 0 0;
  padding-top: var(--spacing-lg);

  em {
    font-style: italic;
  }
}
</style>
