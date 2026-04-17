<template>
  <div class="admin-page">
    <!-- Loading Clerk -->
    <div v-if="!isLoaded" class="admin-loading">
      <p>Loading…</p>
    </div>

    <!-- Not signed in -->
    <div v-else-if="!isSignedIn" class="admin-loading">
      <p>Redirecting to sign in…</p>
    </div>

    <!-- Access denied (signed in but not allowed) -->
    <div v-else-if="accessDenied" class="admin-denied">
      <p>Access denied. This panel is restricted to authorized administrators.</p>
      <button @click="signOut" class="btn-secondary">Sign out</button>
    </div>

    <!-- Admin panel -->
    <div v-else class="admin-shell">
      <div class="admin-header">
        <div class="admin-nav">
          <label class="view-label" for="admin-view-select">View</label>
          <select
            id="admin-view-select"
            v-model="activeView"
            class="view-selector"
          >
            <option value="interpretive-works">Interpretive Works</option>
            <option value="weekly-signal">Weekly Signal</option>
          </select>
        </div>
        <div class="admin-user">
          <span class="admin-user-email">{{ userEmail }}</span>
          <button @click="signOut" class="btn-ghost">Sign out</button>
          <router-link to="/"><button class="btn-ghost">CAS</button></router-link>
        </div>
      </div>

      <AdminInterpretiveWorks v-if="activeView === 'interpretive-works'" />
      <AdminWeeklySignal
        v-else-if="activeView === 'weekly-signal'"
        :initial-signal="currentSignal"
        :initial-loading="signalLoading"
        @published="onSignalPublished"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth, useUser, useClerk } from '@clerk/vue';
import { useHead } from '@unhead/vue';
import AdminInterpretiveWorks from '@/components/admin/AdminInterpretiveWorks.vue';
import AdminWeeklySignal from '@/components/admin/AdminWeeklySignal.vue';
import { fetchCurrentSignal } from '@/utils/currentSignal';

useHead({
  title: 'Admin — Coherence Across Scales',
  meta: [{ name: 'robots', content: 'noindex' }],
});

const router = useRouter();
const { isLoaded, isSignedIn } = useAuth();
const { user } = useUser();
const clerk = useClerk();

const ALLOWED_EMAILS = ['iamthewebkid@gmail.com', 'mahunahi@gmail.com', 'kid@thewebkid.com'];

const userEmail = computed(() =>
  user.value?.emailAddresses?.find(
    (e) => e.id === user.value.primaryEmailAddressId
  )?.emailAddress ?? ''
);

const accessDenied = computed(
  () => isLoaded.value && isSignedIn.value && !ALLOWED_EMAILS.includes(userEmail.value)
);

watch([isLoaded, isSignedIn], ([loaded, signedIn]) => {
  if (loaded && !signedIn) {
    router.push('/admin/sign-in');
  }
}, { immediate: true });

async function signOut() {
  await clerk.value?.signOut();
  router.push('/admin/sign-in');
}

const activeView = ref('interpretive-works');

// Pre-load the latest Weekly Signal as soon as an authorized admin lands on the page,
// so switching the dropdown to "Weekly Signal" shows populated fields instantly.
const currentSignal = ref(null);
const signalLoading = ref(false);

async function preloadCurrentSignal() {
  signalLoading.value = true;
  const row = await fetchCurrentSignal();
  if (row) currentSignal.value = row;
  signalLoading.value = false;
}

watch(
  [isLoaded, isSignedIn, accessDenied],
  ([loaded, signedIn, denied]) => {
    if (loaded && signedIn && !denied && currentSignal.value === null && !signalLoading.value) {
      preloadCurrentSignal();
    }
  },
  { immediate: true }
);

function onSignalPublished(row) {
  if (row) currentSignal.value = row;
}
</script>

<style lang="scss">
.admin-page {
  min-height: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 111;
  width: 100%;
  background: var(--bg-secondary);
}

.admin-loading,
.admin-denied {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: var(--spacing-md);
  color: var(--text-muted);
  font-family: var(--font-sans);
}

.admin-shell {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.admin-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--bg);
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
  gap: var(--spacing-md);
}

.admin-nav {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.view-label {
  font-family: var(--font-sans);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-muted);
  font-weight: 500;
}

.view-selector {
  font-family: var(--font-sans);
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text);
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 0.35rem 0.6rem;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: var(--iw-accent, var(--accent));
  }
}

.admin-user {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.admin-user-email {
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  color: var(--text-muted);
}

.btn-secondary {
  padding: 0.5rem 1rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  font-family: var(--font-sans);
  font-size: 0.875rem;
  color: var(--text);
  cursor: pointer;

  &:hover { background: var(--border); }
}

.btn-ghost {
  background: transparent;
  border: none;
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  color: var(--text-muted);
  cursor: pointer;
  padding: 0.25rem 0.5rem;

  &:hover { color: var(--text); }
}
</style>
