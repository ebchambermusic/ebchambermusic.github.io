<template>
  <div class="home">
    <PageDescription :description="description" />
    <div v-for="announcement in merged" :key="announcement.eventId"
      class="event-wrapper">
      <AnnounceCard :announcement="announcement"/>
      <ProgramCard v-if="announcement.program" :program="announcement.performances" />
    </div>
    <!-- <div class="archive-link">
      <RouterLink to="/archive">Click here to see past programs!</RouterLink>
    </div> -->
  </div>
</template>

<script setup>
import PageDescription from "../components/PageDescription.vue"
import AnnounceCard from "@/components/AnnounceCard.vue"
import ProgramCard from "@/components/ProgramCard.vue"
import { ref, onMounted } from "vue"
import { useMainData, useMerge } from "../composables/data.js"

const { fetchMainData, subData } = useMainData()
const { merge } = useMerge()

const description = subData("descriptions.data[0].home")
const announcements = subData("announcements.data")
const programs = subData("programs.data")

const merged = ref([])

onMounted(async () => {
  await fetchMainData()
  merged.value = merge(announcements.value, programs.value)
})
</script>

<style>
.home {
  display: flex;
  flex-direction: column;
}
.event-wrapper {
  margin-bottom: 2.5rem;
}
.archive-link {
  text-align: center;
  margin-bottom: 2.5rem;
}
</style>
