<template>
  <div class="archive">
    <PageDescription :description="description" />
    <div class="events">
      <div v-for="(event, index) in merged" :key="event.eventId"
        class="event-wrapper">
        <div class="event" @click="toggle(index)"
          :class="[$style.interact,
            { [$style.open]: currentIndex === index, 'open': currentIndex === index }]">
          {{ event.date }}
        </div>
        <Transition name="animate">
          <div v-if="currentIndex === index"
            class="archive-program-wrapper"
            :class="$style['animate-wrapper']">
            <div :class="$style.accordion">
              <div class="event-details">
                <div>{{ event.venue }}</div>
                <div>Host: {{ event.host }}</div>
              </div>
              <div class="archive-program">
                <ProgramCard :program="event.performances"/>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import PageDescription from "../components/PageDescription.vue"
import ProgramCard from "@/components/ProgramCard.vue"
import { ref, onMounted } from "vue"
import { useMainData, useToggle, useMerge } from "../composables/data.js"

const { fetchMainData, subData } = useMainData()
const { currentIndex, toggle } = useToggle()
const { merge } = useMerge()

const description = subData("descriptions.data[0].archive")
const events = subData("archive.data")
const programs = subData("repertoire.data")

const merged = ref([])

onMounted(async () => {
  await fetchMainData()
  merged.value = merge(events.value, programs.value)
})
</script>

<style module>
@import "../assets/toggle.module.css";
</style>

<style scoped>
.archive {
  display: flex;
  flex-direction: column;
}
.events {
  margin-top: 2rem;
}
.event-wrapper {
  margin-bottom: 0.75rem;
}
.event {
  display: flex;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 500;
  background-color: var(--color-background-alt);
  padding: 0.5rem;
}
.open {
  background-color: var(--color-hover);
}
.archive-program-wrapper {
  color: var(--color-light-text);
  background-color: var(--color-highlight);
}
:deep(.program-wrapper) {
  font-size: 1rem;
  padding: 1.5rem 1rem;
  margin-top: 0;
}
.event-details {
  display: flex;
  flex-direction: column;
  font-size: 1.1rem;
  text-align: center;
  font-style: italic;
  border-bottom: 3px dotted var(--color-hover);
  padding: 1rem;
  white-space: pre-wrap;
}
.archive-program {
  transition: all 0.4s ease-in-out;
  padding: 0;
}
.archive-program:first-of-type {
  margin-top: 0;
}
@media (hover: hover) {
  .event:hover {
    background-color: var(--color-hover);
  }
}
@media screen and (max-width: 600px) {
  :deep(.program) {
    margin-top: 2rem;
  }
}
</style>
