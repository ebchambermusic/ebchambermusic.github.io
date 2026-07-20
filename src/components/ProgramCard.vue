<template>
  <div class="program-wrapper">
    <div v-for="(entry, index) in display" :key="`${entry.eventId}-${index}`" class="program">
      <span class="piece">{{ entry.piece }}</span
      ><span class="composer">{{ entry.composer }}</span>
      <div class="performers">{{ entry.performers }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue"
import { useMainData } from "../composables/data.js"

const props = defineProps({
  currentProgram: {
    type: String,
    required: true,
    default: "",
  },
})

const { fetchMainData, subData } = useMainData()

const program = subData("programs.data")
// const labels = subData("programs.labels");

const exclude = ["eventId"]
const display = computed(() => {
  if (!program.value) return []
  const findEnd = program.value.findIndex((item) => item.eventId !== props.currentProgram)
  const current = findEnd === -1 ? program.value : program.value.slice(0, findEnd)
  return current.filter((item) => !exclude.includes(item.id))
})

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
  grid-template-columns: repeat(3, 1fr);
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
