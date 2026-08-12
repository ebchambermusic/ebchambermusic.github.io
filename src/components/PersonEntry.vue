<template>
  <div class="person">
    <i>
      <slot name="icon"></slot>
    </i>
    <div class="details">
      <h3>
        <slot name="heading"></slot>
      </h3>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.person {
  margin-top: 2rem;
  display: flex;
  position: relative;
  background: var(--color-background-alt);
  border-radius: var(--border-radius);
  padding: 1rem;
}

.details {
  flex: 1;
  margin-left: 1rem;
}

i {
  display: flex;
  place-items: center;
  place-content: center;
  width: 40px;
  height: 40px;
  color: var(--color-highlight);
}

h3 {
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: var(--color-text);
}

@media screen and (max-width: 600px) {
  .person {
    flex-direction: column;
  }
  .details {
    margin-top: 0.5rem;
    margin-left: 0;
  }
}
</style>
