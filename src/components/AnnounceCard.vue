<template>
  <div class="announcement-wrapper">
    <span class="announcement title">
      <MusicNotes v-if="!mediaBreak" />
      {{ announcement.name }}
      <MusicNotes v-if="!mediaBreak" />
    </span>
    <div
      v-for="(field, key) in display"
      :key="field.name"
      class="announcement"
      :class="{ status: key === 'status', notes: key === 'notes', venue: key === 'venue' }"
    >
      <span v-if="key === 'host'">{{ labels[key] }}: </span>
      <span class="content">{{ field }}</span>
    </div>
  </div>
</template>

<script setup>
import MusicNotes from "./icons/MusicNotes.vue"
import { computed, onMounted } from "vue"
import { useMainData } from "../composables/data.js"
import { checkMedia } from "../composables/media.js"

const { fetchMainData, subData } = useMainData()

const mediaBreak = checkMedia("(max-width: 600px)")

const announcement = subData("announcements.data[0]")
const labels = subData("announcements.labels")

const display = computed(() => {
  if (!announcement.value) return {}
  const exclude = ["eventId", "name"]
  if (!announcement.value.status) {
    exclude.push("contact")
  }
  const announce = Object.entries(announcement.value)
    .filter(([key, value]) => !exclude.includes(key) && !(key === "notes" && value === ""))
    .map(([key, value]) => {
      let final = value
      return [key, final]
    })
  return Object.fromEntries(announce)
})

onMounted(async () => {
  fetchMainData()
})
</script>

<style scoped>
.announcement-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  font-size: 1.5rem;
  white-space: pre-wrap;
  color: var(--color-light-text);
  background-color: var(--color-announce);
  background:
    linear-gradient(
      color-mix(in srgb, var(--color-background-overlay) 75%, transparent),
      color-mix(in srgb, var(--color-background-overlay) 75%, transparent)
    ),
    url("/background.jpg") no-repeat center;
  /* photo by yousef espanioly on unsplash: https://unsplash.com/photos/ovate-green-leaf-plant-hbQeCpo-Cp0 */
  background-size: cover;
  border-radius: var(--border-radius);
  padding: 2rem;
  margin-top: 2rem;
}
.announcement {
  display: flex-inline;
  align-items: center;
  height: 100%;
  text-align: center;
  .iconify {
    display: flex;
    height: 2rem;
  }
  .content {
    font-weight: 600;
  }
}
.title {
  display: flex;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
}
.venue {
  margin-bottom: 1rem;
}
.status,
.notes {
  font-style: italic;
  .content {
    font-weight: 400;
  }
}
.notes {
  font-size: 1rem;
  margin: 8px 0;
}

@media screen and (max-width: 600px) {
  .announcement-wrapper {
    font-size: 1.25rem;
    padding: 1.5rem 1rem;
  }
  .title {
    font-size: 1.5rem;
  }
}
</style>
