<template>
  <Teleport to="body">
    <transition name="modal-fade">
      <div v-if="visible" class="modal-overlay" @click.self="close">
        <div class="modal-content">
          <template v-if="state === 'choose'">
            <h2>Place an anonymous signal</h2>
            <p>
              This will place a small marker on the map at an approximate location.
              No personal information is collected or displayed.
            </p>

            <div class="modal-actions">
              <button class="modal-btn primary" @click="useGeolocation">
                Allow approximate location
              </button>
              <span class="or-divider">or</span>
              <button class="modal-btn secondary" @click="useManual">
                Select on map
              </button>
            </div>
          </template>

          <template v-if="state === 'confirm'">
            <h2>Confirm your signal</h2>
            <p class="coords-note">
              Approximate location selected. Your precise position will not be stored.
            </p>
            <div class="modal-actions">
              <button class="modal-btn primary" @click="placeSignal" :disabled="submitting">
                {{ submitting ? 'Placing...' : 'Place Signal' }}
              </button>
              <button class="modal-btn secondary" @click="state = 'choose'">Back</button>
            </div>
          </template>

          <template v-if="state === 'placed'">
            <div class="placed-message">
              <p class="placed-primary">Your signal has been placed.</p>
              <p class="placed-secondary">Thank you for making presence visible.</p>
            </div>
            <div class="modal-actions">
              <button class="modal-btn secondary" @click="close">Close</button>
            </div>
          </template>

          <template v-if="state === 'error'">
            <h2>Something went wrong</h2>
            <p>{{ errorMessage }}</p>
            <div class="modal-actions">
              <button class="modal-btn secondary" @click="state = 'choose'">Try again</button>
            </div>
          </template>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  visible: Boolean,
});

const emit = defineEmits(['close', 'enter-click-mode', 'signal-placed']);

const state = ref('choose');
const coords = ref(null);
const submitting = ref(false);
const errorMessage = ref('');

function close() {
  state.value = 'choose';
  coords.value = null;
  emit('close');
}

function useGeolocation() {
  if (!navigator.geolocation) {
    errorMessage.value = 'Geolocation is not supported by your browser. Please select on the map instead.';
    state.value = 'error';
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      coords.value = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      state.value = 'confirm';
    },
    () => {
      errorMessage.value = 'Location access was denied. You can select a location on the map instead.';
      state.value = 'error';
    },
    { enableHighAccuracy: false, timeout: 10000 }
  );
}

function useManual() {
  emit('enter-click-mode');
}

function setManualCoords(lat, lng) {
  coords.value = { lat, lng };
  state.value = 'confirm';
}

async function placeSignal() {
  if (!coords.value) return;
  submitting.value = true;

  try {
    const res = await fetch('/api/signals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(coords.value),
    });

    if (!res.ok) {
      throw new Error('Server returned ' + res.status);
    }

    const data = await res.json();
    localStorage.setItem('signal-placed', 'true');
    state.value = 'placed';
    emit('signal-placed', data.signal);
  } catch (e) {
    errorMessage.value = 'Failed to place your signal. Please try again.';
    state.value = 'error';
  } finally {
    submitting.value = false;
  }
}

function reset() {
  state.value = 'choose';
  coords.value = null;
}

defineExpose({ setManualCoords, reset });
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  max-width: 480px;
  width: 100%;

  h2 {
    font-family: var(--font-serif);
    font-size: 1.375rem;
    font-weight: 400;
    margin-bottom: var(--spacing-sm);
  }

  p {
    color: var(--text-muted);
    margin-bottom: var(--spacing-md);
    font-size: 0.9375rem;
    line-height: 1.6;
  }
}

.modal-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: var(--spacing-md);
}

.or-divider {
  text-align: center;
  color: var(--text-muted);
  font-size: 0.8125rem;
  font-style: italic;
}

.modal-btn {
  font-family: var(--font-sans);
  font-size: 0.9375rem;
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  cursor: pointer;
  transition: all var(--transition-speed) ease;
  background: transparent;
  color: var(--text);

  &.primary {
    background: var(--accent);
    color: #fff;
    border-color: var(--accent);

    &:hover:not(:disabled) {
      background: var(--accent-hover);
      border-color: var(--accent-hover);
    }
  }

  &.secondary {
    &:hover {
      background: var(--bg-secondary);
      border-color: var(--accent);
    }
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.placed-message {
  text-align: center;
  padding: var(--spacing-md) 0;

  .placed-primary {
    font-family: var(--font-serif);
    font-size: 1.25rem;
    font-style: italic;
    color: var(--text);
    margin-bottom: var(--spacing-xs);
  }

  .placed-secondary {
    color: var(--text-muted);
    font-size: 0.9375rem;
  }
}

.coords-note {
  font-size: 0.875rem !important;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
