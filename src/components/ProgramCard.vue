<template>
  <div class="program-wrapper">
    <div v-for="(entry, index) in props.program" :key="`${entry.eventId}-${index}`" class="program">
      <span class="piece">{{ entry.piece }}</span>
      <span class="composer">{{ entry.composer }}</span>
      <div class="performers">{{ entry.performers }}</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue"
import { useMainData } from "../composables/data.js"

const props = defineProps({
  program: {
    type: Array,
    default: () => []
  },
})

const { fetchMainData } = useMainData()

// const exclude = ["eventId"]
// const display = computed(() => {
//   const list = program.value
//   if (!list?.length) return []
//   const id = props.currentProgram
//   const start = list.findIndex((entry) => entry.eventId === id)
//   if (start === -1) return []
//   const next = list.slice(start).findIndex((entry) => entry.eventId !== id)
//   const end = next === -1 ? list.length : start + next
//   return list.slice(start, end).map((entry) => {
//     return Object.fromEntries(
//       Object.entries(entry).filter(([key]) => !exclude.includes(key))
//     )
//   })
// })

onMounted(async () => {
  fetchMainData()
})
</script>

<style scoped>
.program-wrapper {
  font-size: 1.1rem;
  white-space: pre-wrap;
  color: var(--color-light-text);
  background-color: var(--color-announce);
  border-radius: var(--border-radius);
  padding: 2rem;
  margin-top: 1rem;
}
.program {
  display: grid;
  grid-template-columns: 1fr 50px max-content;
  grid-template-rows: repeat(2, auto);
  height: 100%;
  margin-top: 2rem;
  .piece {
    grid-area: 1 / 1 / 2 / 2;
    font-weight: 600;
  }
  .composer {
    grid-area: 1 / 3 / 2 / 4;
    text-align: right;
  }
  .performers {
    grid-area: 2 / 1 / 3 / 4;
    text-align: center;
    margin-top: 1rem;
  }
}
.program:first-of-type {
  margin-top: 0;
}

@media screen and (max-width: 600px) {
  .program-wrapper {
    padding: 1.5rem 1rem;
  }
  .program {
    display: flex;
    flex-direction: column;
    margin-top: 3rem;
  }
  .piece,
  .composer,
  .performers {
    display: flex;
    justify-content: center;
    text-align: center;
  }
}
</style>
