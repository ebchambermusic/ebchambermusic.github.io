<template>
  <div class="description">
    <div class="description-content">
      <div v-if="description">{{ description }}</div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  description: {
    type: String,
    required: false,
    default: "",
  },
})
</script>

<style scoped>
.description {
  padding-top: 1rem;
  text-align: center;
}
.description-content {
  font-size: 1.1rem;
  color: var(--color-text);
  white-space: pre-wrap;
}
</style>
