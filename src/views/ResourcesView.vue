<template>
  <div class="resources">
    <PageDescription :description="description" />
  </div>
</template>

<script setup>
import PageDescription from "../components/PageDescription.vue"
import { onMounted } from "vue"
import { useMainData } from "../composables/data.js"

const { fetchMainData, subData } = useMainData()

const description = subData("descriptions.data[0].resources")

onMounted(() => {
  fetchMainData()
})
</script>

<style>
.resources {
  display: flex;
  flex-direction: column;
}
</style>
