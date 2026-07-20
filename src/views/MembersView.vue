<template>
  <div class="members">
    <PageDescription :description="description" />
    <LinkCard url="https://forms.gle/vndUTwXcNZSCHi4s6">
      Click here to add your member profile to this page (Google Form)
    </LinkCard>
    <LinkCard url="https://groups.google.com/g/ebchambermusic/about">
      Click here to join the Google Group for email announcements
    </LinkCard>
    <PersonList data="/members.json" />
  </div>
</template>

<script setup>
import PersonList from "../components/PersonList.vue"
import PageDescription from "../components/PageDescription.vue"
import LinkCard from "../components/LinkCard.vue"
import { onMounted } from "vue"
import { useMainData } from "../composables/data.js"

const { fetchMainData, subData } = useMainData()

const description = subData("descriptions.data[0].members")

onMounted(() => {
  fetchMainData()
})
</script>

<style>
.members {
  display: flex;
  flex-direction: column;
}
</style>
