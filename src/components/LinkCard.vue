<template>
  <div class="link-card">
    <div class="link">
      <a :href="url" target="_blank">
        <slot></slot>
      </a>
    </div>
  </div>
</template>

<script setup>
defineProps({
  url: {
    type: String,
    required: true,
  },
})
</script>

<style scoped>
.link-card {
  font-size: 1.1rem;
  text-align: center;
  background: var(--color-button);
  margin-top: 1.25rem;
  a {
    display: inline-block;
    width: 100%;
    color: var(--color-light-text);
    padding: 1rem;
  }
}
</style>
