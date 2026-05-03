<template>
  <div class="admin-fe">
    <div class="fe-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        class="filter-tab"
        :class="{ active: activeFilter === tab.value }"
        @click="setFilter(tab.value)"
      >
        {{ tab.label }}
        <span v-if="countFor(tab.value)" class="tab-count">{{ countFor(tab.value) }}</span>
      </button>
    </div>

    <div class="admin-body">
      <aside class="admin-sidebar">
        <div v-if="loading" class="list-loading">Loading…</div>

        <div v-else-if="filteredItems.length === 0" class="list-empty">
          No submissions in this category.
        </div>

        <ul v-else class="submission-list">
          <li
            v-for="item in filteredItems"
            :key="item.id"
            class="submission-item"
            :class="{ active: selected?.id === item.id, unreviewed: !item.reviewed }"
            @click="selectItem(item)"
          >
            <div class="item-title">{{ item.name || 'Anonymous' }}</div>
            <div class="item-meta">
              <span v-if="item.expression">{{ item.expression }}</span>
              <template v-if="item.expression && item.location"><span>·</span></template>
              <span v-if="item.location">{{ item.location }}</span>
            </div>
            <div class="item-date">{{ formatDate(item.created_at) }}</div>
            <span class="status-dot" :class="item.reviewed ? 'status-dot--reviewed' : 'status-dot--unreviewed'" />
          </li>
        </ul>
      </aside>

      <main class="admin-detail">
        <div v-if="!selected" class="detail-empty">
          <p>Select a submission to review.</p>
        </div>

        <div v-else class="detail-content">
          <div class="detail-header">
            <div>
              <h2 class="detail-title">{{ selected.name || 'Anonymous' }}</h2>
              <div class="detail-meta">
                <span class="reviewed-badge" :class="selected.reviewed ? 'reviewed-badge--reviewed' : 'reviewed-badge--unreviewed'">
                  {{ selected.reviewed ? 'Reviewed' : 'Unreviewed' }}
                </span>
                <span v-if="selected.expression">{{ selected.expression }}</span>
                <span>{{ formatDate(selected.created_at) }}</span>
              </div>
            </div>
            <div class="detail-actions">
              <button
                class="btn-action"
                :class="selected.reviewed ? 'btn-unmark' : 'btn-mark'"
                @click="toggleReviewed"
                :disabled="saving"
              >
                {{ saving ? 'Saving…' : selected.reviewed ? 'Mark unreviewed' : 'Mark reviewed' }}
              </button>
            </div>
          </div>

          <div class="detail-grid">
            <div v-if="selected.name" class="detail-row">
              <dt>Name</dt>
              <dd>{{ selected.name }}</dd>
            </div>
            <div v-if="selected.location" class="detail-row">
              <dt>Location</dt>
              <dd>{{ selected.location }}</dd>
            </div>
            <div v-if="selected.expression" class="detail-row">
              <dt>Form</dt>
              <dd>{{ selected.expression }}</dd>
            </div>
            <div v-if="selected.movement_number" class="detail-row">
              <dt>Movement #</dt>
              <dd>{{ selected.movement_number }}</dd>
            </div>
          </div>

          <div v-if="selected.movement" class="detail-section">
            <h3 class="section-label">Submission</h3>
            <p class="detail-body">{{ selected.movement }}</p>
          </div>

          <div v-if="selected.file_url" class="detail-section">
            <h3 class="section-label">Attached File</h3>
            <div class="content-link-row">
              <a :href="selected.file_url" target="_blank" rel="noopener" class="content-link">
                {{ selected.file_pathname || selected.file_url }}
              </a>
              <a :href="selected.file_url" download class="btn-ghost btn-small">Download</a>
            </div>
            <img
              v-if="isImageUrl(selected.file_url)"
              :src="selected.file_url"
              alt="Submitted file"
              class="content-preview-img"
            />
            <video
              v-else-if="isVideoUrl(selected.file_url)"
              :src="selected.file_url"
              class="content-preview-video"
              controls
              preload="metadata"
            />
            <audio
              v-else-if="isAudioUrl(selected.file_url)"
              :src="selected.file_url"
              class="content-preview-audio"
              controls
              preload="metadata"
            />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuth } from '@clerk/vue';

const { getToken } = useAuth();

const tabs = [
  { label: 'Unreviewed', value: 'unreviewed' },
  { label: 'Reviewed', value: 'reviewed' },
  { label: 'All', value: 'all' },
];

const allItems = ref([]);
const loading = ref(false);
const activeFilter = ref('unreviewed');
const selected = ref(null);
const saving = ref(false);

const filteredItems = computed(() => {
  if (activeFilter.value === 'all') return allItems.value;
  if (activeFilter.value === 'reviewed') return allItems.value.filter((i) => i.reviewed);
  return allItems.value.filter((i) => !i.reviewed);
});

function countFor(filter) {
  if (filter === 'all') return allItems.value.length || '';
  if (filter === 'reviewed') return allItems.value.filter((i) => i.reviewed).length || '';
  return allItems.value.filter((i) => !i.reviewed).length || '';
}

function setFilter(value) {
  activeFilter.value = value;
  selected.value = null;
}

function selectItem(item) {
  selected.value = item;
}

async function getAuthHeader() {
  const token = await getToken.value();
  return { Authorization: `Bearer ${token}` };
}

async function fetchItems() {
  loading.value = true;
  try {
    const headers = await getAuthHeader();
    const res = await fetch('/api/admin/field-expressions?filter=all', { headers });
    if (!res.ok) throw new Error('Failed to load field expressions');
    allItems.value = await res.json();
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
}

async function toggleReviewed() {
  if (!selected.value) return;
  saving.value = true;
  try {
    const headers = { ...(await getAuthHeader()), 'Content-Type': 'application/json' };
    const res = await fetch('/api/admin/field-expressions', {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ id: selected.value.id, reviewed: !selected.value.reviewed }),
    });
    if (!res.ok) throw new Error('Update failed');
    const updated = await res.json();
    const idx = allItems.value.findIndex((i) => i.id === updated.id);
    if (idx !== -1) allItems.value[idx] = updated;
    selected.value = updated;
  } catch (err) {
    console.error(err);
  } finally {
    saving.value = false;
  }
}

onMounted(() => {
  fetchItems();
});

function formatDate(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });
}

function isImageUrl(url) {
  return /\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i.test(url);
}

function isVideoUrl(url) {
  return /\.(mp4|mov|webm|ogv|avi|mkv)(\?.*)?$/i.test(url);
}

function isAudioUrl(url) {
  return /\.(mp3|wav|ogg|flac|aac|m4a)(\?.*)?$/i.test(url);
}
</script>

<style lang="scss" scoped>
.admin-fe {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
}

.fe-tabs {
  display: flex;
  overflow-x: auto;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
  scrollbar-width: none;
  background: var(--bg);

  &::-webkit-scrollbar { display: none; }
}

.filter-tab {
  flex-shrink: 0;
  padding: 0.625rem var(--spacing-sm);
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-muted);
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  transition: color var(--transition-speed) ease, border-color var(--transition-speed) ease;

  &.active {
    color: var(--accent);
    border-bottom-color: var(--accent);
  }

  &:hover:not(.active) {
    color: var(--text);
  }
}

.tab-count {
  background: var(--bg-secondary);
  border-radius: 10px;
  padding: 0 6px;
  font-size: 0.7rem;
  color: var(--text-muted);
}

.admin-body {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.admin-sidebar {
  width: 300px;
  flex-shrink: 0;
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--bg);

  @media (max-width: 700px) {
    width: 100%;
    height: 280px;
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
}

.list-loading,
.list-empty {
  padding: var(--spacing-md);
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  color: var(--text-muted);
  text-align: center;
}

.submission-list {
  list-style: none;
  margin: 0;
  padding: 0;
  overflow-y: auto;
  flex: 1;
}

.submission-item {
  position: relative;
  padding: var(--spacing-sm) var(--spacing-md);
  border-bottom: 1px solid var(--border);
  cursor: pointer;
  transition: background var(--transition-speed) ease;

  &:hover { background: var(--bg-secondary); }
  &.active { background: var(--bg-secondary); }
  &.unreviewed .item-title { font-weight: 600; }
}

.item-title {
  font-family: var(--font-sans);
  font-size: 0.875rem;
  color: var(--text);
  margin-bottom: 0.2rem;
}

.item-meta {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  color: var(--text-muted);
  display: flex;
  gap: 0.375rem;
  margin-bottom: 0.2rem;
}

.item-date {
  font-family: var(--font-sans);
  font-size: 0.7rem;
  color: var(--text-muted);
}

.status-dot {
  position: absolute;
  top: 50%;
  right: var(--spacing-sm);
  transform: translateY(-50%);
  width: 7px;
  height: 7px;
  border-radius: 50%;

  &--unreviewed { background: var(--accent); }
  &--reviewed { background: var(--text-muted); }
}

.admin-detail {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-lg);
}

.detail-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-family: var(--font-sans);
  font-size: 0.875rem;
  color: var(--text-muted);
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
  flex-wrap: wrap;
}

.detail-title {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: var(--spacing-xs);
}

.detail-meta {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  color: var(--text-muted);
}

.detail-actions {
  display: flex;
  gap: var(--spacing-xs);
}

.btn-action {
  padding: 0.4rem 0.875rem;
  border: none;
  border-radius: var(--radius-sm);
  font-family: var(--font-sans);
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: opacity var(--transition-speed) ease;

  &:disabled { opacity: 0.5; cursor: not-allowed; }
}

.btn-mark { background: var(--accent); color: var(--bg); }
.btn-unmark { background: var(--bg-secondary); color: var(--text); border: 1px solid var(--border); }

.reviewed-badge {
  display: inline-block;
  padding: 0.15rem 0.5rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.04em;

  &--unreviewed { background: rgba(155, 128, 96, 0.15); color: var(--accent); }
  &--reviewed { background: var(--bg-secondary); color: var(--text-muted); }
}

.detail-grid {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  margin-bottom: var(--spacing-lg);
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: var(--spacing-sm) var(--spacing-md);
}

.detail-row {
  display: flex;
  gap: var(--spacing-sm);

  dt {
    font-family: var(--font-sans);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-muted);
    min-width: 7rem;
    flex-shrink: 0;
  }

  dd {
    font-family: var(--font-sans);
    font-size: 0.875rem;
    margin: 0;
  }
}

.detail-section {
  margin-bottom: var(--spacing-lg);
}

.section-label {
  font-family: var(--font-sans);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--accent);
  margin-bottom: var(--spacing-xs);
}

.detail-body {
  font-size: 0.9375rem;
  line-height: 1.7;
  white-space: pre-wrap;
  margin: 0;
}

.content-link-row {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
  margin-bottom: var(--spacing-sm);
}

.content-link {
  font-family: var(--font-sans);
  font-size: 0.875rem;
  color: var(--accent);
  word-break: break-all;
}

.content-preview-img {
  max-width: 100%;
  max-height: 400px;
  object-fit: contain;
  border-radius: var(--radius-sm);
  display: block;
  margin-top: var(--spacing-sm);
}

.content-preview-video {
  max-width: 100%;
  max-height: 400px;
  border-radius: var(--radius-sm);
  display: block;
  margin-top: var(--spacing-sm);
  background: #000;
}

.content-preview-audio {
  width: 100%;
  display: block;
  margin-top: var(--spacing-sm);
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

.btn-small {
  font-size: 0.75rem;
  padding: 0.2rem 0.5rem;
}

@media (max-width: 700px) {
  .admin-body {
    flex-direction: column;
  }

  .admin-detail {
    padding: var(--spacing-md);
  }
}
</style>
