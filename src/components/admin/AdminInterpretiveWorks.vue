<template>
  <div class="admin-iw">
    <div class="iw-tabs">
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
        <div v-if="loadingList" class="list-loading">Loading…</div>

        <div v-else-if="filteredSubmissions.length === 0" class="list-empty">
          No submissions in this category.
        </div>

        <ul v-else class="submission-list">
          <li
            v-for="s in filteredSubmissions"
            :key="s.id"
            class="submission-item"
            :class="{ active: selected?.id === s.id, unread: s.status === 'unread' }"
            @click="selectSubmission(s)"
          >
            <div class="item-title">{{ s.work_title }}</div>
            <div class="item-meta">
              <span>{{ s.submitter_name }}</span>
              <span>·</span>
              <span>{{ s.work_type }}</span>
            </div>
            <div class="item-date">{{ formatDate(s.created_at) }}</div>
            <span class="status-dot" :class="`status-dot--${s.status}`" />
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
              <h2 class="detail-title">{{ selected.work_title }}</h2>
              <div class="detail-meta">
                <span class="status-badge" :class="`status-badge--${selected.status}`">{{ selected.status }}</span>
                <span>{{ selected.work_type }}</span>
                <span>{{ formatDate(selected.created_at) }}</span>
              </div>
            </div>
            <div class="detail-actions">
              <button
                v-if="selected.status !== 'approved'"
                class="btn-action btn-approve"
                @click="updateStatus('approved')"
                :disabled="saving"
              >Approve</button>
              <button
                v-if="selected.status !== 'declined'"
                class="btn-action btn-decline"
                @click="updateStatus('declined')"
                :disabled="saving"
              >Decline</button>
              <button
                v-if="selected.status !== 'archived'"
                class="btn-action btn-archive"
                @click="updateStatus('archived')"
                :disabled="saving"
              >Archive</button>
            </div>
          </div>

          <div class="detail-grid">
            <div class="detail-row">
              <dt>Submitter</dt>
              <dd>{{ selected.submitter_name }}</dd>
            </div>
            <div class="detail-row">
              <dt>Email</dt>
              <dd>
                <a :href="`mailto:${selected.submitter_email}`" class="email-link">
                  {{ selected.submitter_email }}
                </a>
                <button class="copy-btn" @click="copyEmail(selected.submitter_email)" title="Copy email">⎘</button>
              </dd>
            </div>
            <div class="detail-row">
              <dt>Display name</dt>
              <dd>{{ selected.display_name_consent ? 'Consented' : 'Not consented' }}</dd>
            </div>
            <div class="detail-row">
              <dt>Type</dt>
              <dd>{{ selected.work_type }}</dd>
            </div>
          </div>

          <div class="detail-section">
            <h3 class="section-label">Description</h3>
            <p class="detail-body">{{ selected.work_description }}</p>
          </div>

          <div v-if="selected.work_url" class="detail-section">
            <h3 class="section-label">Content Link</h3>
            <div class="content-link-row">
              <a :href="selected.work_url" target="_blank" rel="noopener" class="content-link">
                {{ selected.work_url }}
              </a>
              <a :href="selected.work_url" :download="selected.work_title" class="btn-ghost btn-small">Download</a>
            </div>
            <img
              v-if="isImageUrl(selected.work_url)"
              :src="selected.work_url"
              :alt="selected.work_title"
              class="content-preview-img"
            />
            <video
              v-else-if="isVideoUrl(selected.work_url)"
              :src="selected.work_url"
              class="content-preview-video"
              controls
              preload="metadata"
            />
            <audio
              v-else-if="isAudioUrl(selected.work_url)"
              :src="selected.work_url"
              class="content-preview-audio"
              controls
              preload="metadata"
            />
          </div>

          <div v-if="selected.work_file_info" class="detail-section">
            <h3 class="section-label">File / Format Notes</h3>
            <p class="detail-body">{{ selected.work_file_info }}</p>
          </div>

          <div class="detail-section notes-section">
            <h3 class="section-label">Internal Notes</h3>
            <textarea
              v-model="notesBuffer"
              class="notes-textarea"
              rows="4"
              placeholder="Add internal notes here…"
              :disabled="saving"
            />
            <button
              class="btn-save"
              @click="saveNotes"
              :disabled="saving || notesBuffer === selected.admin_notes"
            >
              {{ saving ? 'Saving…' : 'Save Notes' }}
            </button>
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
  { label: 'Unread', value: 'unread' },
  { label: 'Approved', value: 'approved' },
  { label: 'Declined', value: 'declined' },
  { label: 'Archived', value: 'archived' },
  { label: 'All', value: 'all' },
];

const allSubmissions = ref([]);
const loadingList = ref(false);
const activeFilter = ref('unread');
const selected = ref(null);
const notesBuffer = ref('');
const saving = ref(false);

const filteredSubmissions = computed(() => {
  if (activeFilter.value === 'all') return allSubmissions.value;
  return allSubmissions.value.filter((s) => s.status === activeFilter.value);
});

function countFor(filter) {
  if (filter === 'all') return allSubmissions.value.length || '';
  const n = allSubmissions.value.filter((s) => s.status === filter).length;
  return n || '';
}

function setFilter(value) {
  activeFilter.value = value;
  selected.value = null;
}

function selectSubmission(s) {
  selected.value = s;
  notesBuffer.value = s.admin_notes ?? '';
}

async function getAuthHeader() {
  const token = await getToken.value();
  return { Authorization: `Bearer ${token}` };
}

async function fetchSubmissions() {
  loadingList.value = true;
  try {
    const headers = await getAuthHeader();
    const res = await fetch('/api/admin/submissions', { headers });
    if (!res.ok) throw new Error('Failed to load submissions');
    allSubmissions.value = await res.json();
  } catch (err) {
    console.error(err);
  } finally {
    loadingList.value = false;
  }
}

async function updateStatus(status) {
  if (!selected.value) return;
  saving.value = true;
  try {
    const headers = { ...(await getAuthHeader()), 'Content-Type': 'application/json' };
    const res = await fetch('/api/admin/submissions', {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ id: selected.value.id, status }),
    });
    if (!res.ok) throw new Error('Update failed');
    const updated = await res.json();
    applyUpdate(updated);
  } catch (err) {
    console.error(err);
  } finally {
    saving.value = false;
  }
}

async function saveNotes() {
  if (!selected.value) return;
  saving.value = true;
  try {
    const headers = { ...(await getAuthHeader()), 'Content-Type': 'application/json' };
    const res = await fetch('/api/admin/submissions', {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ id: selected.value.id, adminNotes: notesBuffer.value }),
    });
    if (!res.ok) throw new Error('Save failed');
    const updated = await res.json();
    applyUpdate(updated);
  } catch (err) {
    console.error(err);
  } finally {
    saving.value = false;
  }
}

function applyUpdate(updated) {
  const idx = allSubmissions.value.findIndex((s) => s.id === updated.id);
  if (idx !== -1) allSubmissions.value[idx] = updated;
  selected.value = updated;
  notesBuffer.value = updated.admin_notes ?? '';
}

onMounted(() => {
  fetchSubmissions();
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

function copyEmail(email) {
  navigator.clipboard?.writeText(email);
}
</script>

<style lang="scss" scoped>
.admin-iw {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
}

.iw-tabs {
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
    color: var(--iw-accent, var(--accent));
    border-bottom-color: var(--iw-accent, var(--accent));
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
  &.active { background: var(--iw-bg, var(--bg-secondary)); }
  &.unread .item-title { font-weight: 600; }
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

  &--unread { background: var(--iw-accent, var(--accent)); }
  &--approved { background: #27ae60; }
  &--declined { background: #c0392b; }
  &--archived { background: var(--text-muted); }
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
  flex-wrap: wrap;
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

.btn-approve { background: #27ae60; color: #fff; }
.btn-decline { background: #c0392b; color: #fff; }
.btn-archive { background: var(--bg-secondary); color: var(--text); border: 1px solid var(--border); }

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
    display: flex;
    align-items: center;
    gap: 0.5rem;
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
  color: var(--iw-accent, var(--accent));
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
  color: var(--iw-accent, var(--accent));
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

.email-link {
  color: var(--iw-accent, var(--accent));
  font-size: 0.875rem;
}

.copy-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--text-muted);
  font-size: 0.875rem;
  padding: 0;

  &:hover { color: var(--text); }
}

.notes-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.notes-textarea {
  width: 100%;
  padding: 0.625rem 0.75rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  font-family: var(--font-sans);
  font-size: 0.9rem;
  color: var(--text);
  resize: vertical;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: var(--iw-accent, var(--accent));
  }

  &:disabled { opacity: 0.6; }
}

.btn-save {
  align-self: flex-start;
  padding: 0.5rem 1.25rem;
  background: var(--iw-accent, var(--accent));
  color: var(--bg);
  border: none;
  border-radius: var(--radius-sm);
  font-family: var(--font-sans);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background var(--transition-speed) ease;

  &:hover:not(:disabled) { background: var(--iw-accent-hover, var(--accent-hover)); }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
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

.status-badge {
  display: inline-block;
  padding: 0.15rem 0.5rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.04em;

  &--unread { background: rgba(155, 128, 96, 0.15); color: var(--iw-accent, var(--accent)); }
  &--approved { background: rgba(39, 174, 96, 0.15); color: #27ae60; }
  &--declined { background: rgba(192, 57, 43, 0.12); color: #c0392b; }
  &--archived { background: var(--bg-secondary); color: var(--text-muted); }
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
