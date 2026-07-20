<template>
  <div class="info">
    <PageDescription :description="description" />
    <div v-for="(question, index) in faq" :key="`question-${index}`" class="pair">
      <div class="question" @click="toggleAnswer(index)" :class="{ open: currentIndex === index }">
        {{ question.question }}
      </div>
      <Transition name="animate">
        <div v-if="currentIndex === index" class="animate-wrapper">
          <div class="answer">
            <span>{{ question.answer }}</span>
            <LinkCard
              v-if="question.question === 'How do I join or sign up?'"
              url="https://groups.google.com/g/ebchambermusic/about"
            >
              Join the Google Group for email announcements
            </LinkCard>
            <LinkCard
              v-if="question.question === 'How do I get listed on the members page?'"
              url="https://forms.gle/vndUTwXcNZSCHi4s6"
            >
              Add your member profile to the site
            </LinkCard>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import PageDescription from "../components/PageDescription.vue"
import LinkCard from "../components/LinkCard.vue"
import { ref, onMounted } from "vue"
import { useMainData } from "../composables/data.js"

const { fetchMainData, subData } = useMainData()

const description = subData("descriptions.data[0].information")
const faq = subData("questions.data")

const currentIndex = ref(null)
const toggleAnswer = (index) => {
  if (currentIndex.value === index) {
    currentIndex.value = null
  } else {
    currentIndex.value = index
  }
}

onMounted(() => {
  fetchMainData()
})
</script>

<style>
.info {
  display: flex;
  flex-direction: column;
  font-size: 1.1rem;
  white-space: pre-wrap;
}
.pair {
  margin-top: 2rem;
}
.question {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-link);
  background-color: var(--color-background-alt);
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: background-color 0.4s;
  padding: 1rem;
}
.question:hover {
  background-color: var(--color-hover);
}
.open {
  background-color: var(--color-hover);
  border-radius: var(--border-radius) var(--border-radius) 0 0;
}

.animate-wrapper {
  display: grid;
  grid-template-rows: 1fr;
  overflow: hidden;
  background-color: var(--color-background-alt);
  border-radius: 0 0 var(--border-radius) var(--border-radius);
}
.answer {
  min-height: 0;
  transition: padding 0.4s ease-in-out;
  padding: 1rem;
}
.link-card a {
  transition: all 0.4s ease-in-out;
}
.animate-enter-active {
  transition: all 0.4s ease-out;
}
.animate-leave-active {
  transition: all 0.4s ease-in;
}
.animate-enter-from,
.animate-leave-to {
  grid-template-rows: 0fr;
}
.animate-enter-from .answer,
.animate-leave-to .answer {
  padding-top: 0;
  padding-bottom: 0;
}
.animate-enter-to,
.animate-leave-from {
  grid-template-rows: 1fr;
}
</style>
