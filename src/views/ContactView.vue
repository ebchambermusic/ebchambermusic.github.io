<template>
  <div class="contact">
    <PageDescription :description="description" />
  </div>
</template>

<script setup>
import PageDescription from "../components/PageDescription.vue"
import { onMounted } from "vue"
import { useMainData } from "../composables/data.js"

const { fetchMainData, subData } = useMainData()

const description = subData("descriptions.data[0].contact")

onMounted(() => {
  fetchMainData()
})
</script>

<style>
.contact {
  display: flex;
  flex-direction: column;
}
</style>
