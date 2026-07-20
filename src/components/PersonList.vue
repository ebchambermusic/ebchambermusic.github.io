<template>
  <PersonEntry v-for="person in people" :key="person.timestamp">
    <template #icon>
      <PersonIcon />
    </template>
    <template #heading>
      <span>{{ person.name }}</span>
      <span v-if="person.pronouns"> ({{ person.pronouns }})</span>
      <span v-if="person.location">, {{ person.location }}</span>
    </template>
    <div class="person-wrapper">
      <div class="person-main-info">
        <span>{{ person.instruments }}</span>
        <span>{{ person.emailAddress }}</span>
        <span v-if="person.phoneNumber">{{ person.phoneNumber }}</span>
      </div>
      <div class="person-other-info">
        <div v-for="field in display(person)" :key="field.key" :class="{ intro: field.isIntro }">
          <span v-if="!field.isIntro">{{ labels[field.key] }}: </span>{{ field.value }}
        </div>
      </div>
    </div>
  </PersonEntry>
</template>

<script setup>
import PersonEntry from "./PersonEntry.vue"
import PersonIcon from "./icons/AccountMusic.vue"
import { ref, onMounted } from "vue"

const props = defineProps({
  data: {
    type: String,
    required: true,
  },
})

const people = ref([])
const labels = ref({})

const exclude = [
  "timestamp",
  "name",
  "pronouns",
  "location",
  "instruments",
  "emailAddress",
  "phoneNumber",
]
const display = (person) => {
  if (!person) return []

  return Object.entries(person)
    .filter(([key, value]) => {
      if (exclude.includes(key)) return false
      if (value === null || value === undefined || value === "") return false
      return true
    })
    .map(([key, value]) => {
      let final = value
      // replace 'yes' with an emoji just for fun
      if (key === "interestedInSightreading") {
        final = "✅️"
      }
      return {
        key,
        value: final,
        isIntro: key === "introduction",
      }
    })
}

onMounted(async () => {
  const response = await fetch(props.data)
  const result = await response.json()
  people.value = result.data
  labels.value = result.labels
})
</script>

<style scoped>
.person-wrapper div {
  margin: 0.5rem 0;
}
.person-main-info {
  display: flex;
  span {
    font-weight: 500;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
  }
  span:first-of-type {
    padding-left: 0;
    border: 0;
  }
}
.intro {
  font-style: italic;
}

@media screen and (max-width: 799px) {
  .person-main-info {
    flex-direction: column;
    span {
      padding: 0;
      border: 0;
    }
  }
}
</style>
