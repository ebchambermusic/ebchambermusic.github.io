<template>
  <div class="home">
    <PageDescription :description="description" />
    <AnnounceCard />
    <ProgramCard :currentProgram="currentProgram" />
  </div>
</template>

<script setup>
import PageDescription from "../components/PageDescription.vue"
import AnnounceCard from "@/components/AnnounceCard.vue"
import ProgramCard from "@/components/ProgramCard.vue"
import { onMounted } from "vue"
import { useMainData } from "../composables/data.js"

const { fetchMainData, subData } = useMainData()

const description = subData("descriptions.data[0].home")
const currentProgram = subData("announcements.data[0].eventId")

onMounted(() => {
  fetchMainData()
})
</script>

<style>
.home {
  display: flex;
  flex-direction: column;
}
</style>
