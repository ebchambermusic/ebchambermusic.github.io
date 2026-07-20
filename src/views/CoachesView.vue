<template>
  <div class="coaches">
    <PageDescription :description="description" />
    <LinkCard url="https://forms.gle/JeU3959KQy3DDfci7">
      Click here to add your coaching profile to this page (Google Form)
    </LinkCard>
    <PersonList data="/coaches.json" />
  </div>
</template>

<script setup>
import PersonList from "../components/PersonList.vue"
import PageDescription from "../components/PageDescription.vue"
import LinkCard from "../components/LinkCard.vue"
import { onMounted } from "vue"
import { useMainData } from "../composables/data.js"

const { fetchMainData, subData } = useMainData()

const description = subData("descriptions.data[0].coaches")

onMounted(() => {
  fetchMainData()
})
</script>

<style>
.coaches {
  display: flex;
  flex-direction: column;
}
</style>
