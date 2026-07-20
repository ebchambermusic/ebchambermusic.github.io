<template>
  <div class="error">
    <PageDescription :description="description" />
  </div>
</template>

<script setup>
import PageDescription from "../components/PageDescription.vue"
import { onMounted } from "vue"
import { useMainData } from "../composables/data.js"

const { fetchMainData, subData } = useMainData()

const description = subData("descriptions.data[0].error")

onMounted(() => {
  fetchMainData()
})
</script>

<style>
.error {
  display: flex;
  flex-direction: column;
}
</style>
