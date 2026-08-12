<template>
  <div class="resource">
    <div class="details">
      <h3>
        <slot name="link"></slot>
      </h3>
      <div class="description">
        <slot name="description"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.resource {
  display: flex;
  flex-direction: column;
  position: relative;
  background: var(--color-background-alt);
  padding: 1rem;
  margin: 1.5rem 0;
}

.details {
  flex: 1;
}

.description {
  font-style: italic;
  white-space: pre-wrap;
}

h3 {
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: var(--color-text);
}

@media screen and (max-width: 600px) {

}
</style>
