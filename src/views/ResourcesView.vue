<template>
  <div class="resources">
    <PageDescription :description="description" />
    <div v-for="group in grouped" :key="group.category"
      class="group">
      <div class="category-header">{{ group.category }}</div>
      <ResourceCard v-for="resource in group.items" :key="resource.name">
        <template #link>
          <a :href="resource.link" target="_blank">{{ resource.name }}</a>
        </template>
        <template #description>
          {{ resource.description }}
        </template>
      </ResourceCard>
    </div>
  </div>
</template>

<script setup>
import PageDescription from "../components/PageDescription.vue"
import ResourceCard from "../components/ResourceCard.vue"
import { computed, onMounted } from "vue"
import { useMainData } from "../composables/data.js"

const { fetchMainData, subData } = useMainData()

const description = subData("descriptions.data[0].resources")
const resources = subData("resources.data");
const grouped = computed(() => {
  const list = Array.isArray(resources.value) ? resources.value : [];
  const rearrange = list.reduce((group, info) => {
    if (!info) return group;
    if (!group[info.category]) {
      group[info.category] = { category: info.category, items: [] };
    }
    group[info.category].items.push(info);
    return group;
  }, {});
  return Object.values(rearrange);
});

onMounted(() => {
  fetchMainData()
})
</script>

<style>
.resources {
  display: flex;
  flex-direction: column;
}

.group {
  background-color: var(--color-highlight);
  border-radius: var(--border-radius);
  padding: 0 1.5rem;
  margin-top: 2rem;
}
.group a {
  text-decoration: underline;
}

.category-header {
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-light-text);
  padding-top: 1.5rem;
}
</style>
