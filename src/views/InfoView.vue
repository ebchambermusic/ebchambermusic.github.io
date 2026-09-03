<template>
  <div class="info">
    <PageDescription :description="description" />
    <div v-for="(question, index) in faq" :key="`question-${index}`" class="pair">
      <div class="question" @click="toggle(index)"
        :class="[$style.interact,
          { [$style.open]: currentIndex === index, open: currentIndex === index }]">
        {{ question.question }}
      </div>
      <Transition name="animate">
        <div v-if="currentIndex === index"
          class="answer-wrapper"
          :class="$style['animate-wrapper']">
          <div class="answer"
            :class="$style.accordion">
            <span>{{ question.answer }}</span>
            <LinkCard
              v-if="question.question === 'How do I join or sign up?'"
              url="https://forms.gle/th46mvZECEbru2dF9"
            >
              Join the mailing list and receive announcements
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
import { onMounted } from "vue"
import { useMainData, useToggle } from "../composables/data.js"

const { fetchMainData, subData } = useMainData()
const { currentIndex, toggle } = useToggle()

const description = subData("descriptions.data[0].information")
const faq = subData("questions.data")

onMounted(() => {
  fetchMainData()
})
</script>

<style module>
@import "../assets/toggle.module.css";
</style>

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
  padding: 1rem;
}
.open {
  background-color: var(--color-hover);
}

.answer-wrapper {
  color: var(--color-text);
  background-color: var(--color-background-alt);
}
.link-card a {
  transition: all 0.4s ease-in-out;
}

@media (hover: hover) {
  .question:hover {
    background-color: var(--color-hover);
  }
}
</style>
