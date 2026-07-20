<template>
  <header>
    <div class="header">
      <div class="button-wrapper" v-if="mediaBreak">
        <button class="toggle" @click="menuToggle">
          <span class="menu-icon">
            <CloseIcon v-if="menuOpen" />
            <MenuIcon v-else />
          </span>
        </button>
      </div>
      <nav :class="{ display: menuOpen, transition: mediaBreak }">
        <RouterLink to="/" @click="menuClose()">Home</RouterLink>
        <RouterLink to="/info" @click="menuClose()">Information</RouterLink>
        <RouterLink to="/members" @click="menuClose()">Members</RouterLink>
        <RouterLink to="/coaches" @click="menuClose()">Coaches</RouterLink>
        <RouterLink to="/resources" @click="menuClose()">Resources</RouterLink>
        <RouterLink to="/contact" @click="menuClose()">Contact</RouterLink>
      </nav>
    </div>
  </header>

  <div class="view-wrapper">
    <RouterView />
  </div>

  <footer>
    <div class="footer">
      <div class="footer-content"><TClefIcon /><CClefIcon /><BClefIcon /></div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from "vue"
import { RouterLink, RouterView } from "vue-router"
import { checkMedia } from "./composables/media.js"
import MenuIcon from "./components/icons/MenuIcon.vue"
import CloseIcon from "./components/icons/CloseIcon.vue"
import TClefIcon from "./components/icons/MusicClefTreble.vue"
import CClefIcon from "./components/icons/MusicClefAlto.vue"
import BClefIcon from "./components/icons/MusicClefBass.vue"

const mediaBreak = checkMedia("(max-width: 800px)")

const menuOpen = ref(false)
const menuToggle = () => {
  menuOpen.value = !menuOpen.value
}
const menuClose = () => {
  menuOpen.value = false
}
</script>

<style scoped>
.toggle {
  display: none;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 100%;
  background: var(--color-background);
  /*background: white;*/
  z-index: 100;
}

nav {
  width: 100%;
  position: relative;
  font-size: 1.25rem;
  text-align: center;
  z-index: 50;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}
nav a:first-of-type {
  border: 0;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}
nav a.router-link-exact-active:hover {
  background-color: transparent;
}

.view-wrapper {
  position: relative;
  top: 60px;
  padding-bottom: 60px;
}

.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 100%;
  background: var(--color-background);
  /*background: white;*/
}

.footer-content {
  display: flex;
  justify-content: center;
  .iconify {
    height: 30px;
  }
}

@media screen and (max-width: 800px) {
  .button-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 100%;
    width: 100%;
    background-color: var(--color-background);
    z-index: 75;
  }
  button.toggle {
    display: flex;
    position: relative;
    background-color: var(--color-background);
    border: none;
    border-radius: var(--border-radius);
    color: var(--color-highlight);
    z-index: 75;
  }
  .toggle:hover {
    background-color: var(--color-hover);
  }

  nav {
    position: fixed;
    display: flex;
    flex-direction: column;
    top: 60px;
    left: 0;
    height: 100vh;
    width: 100%;
    transform: translateY(-100%);
    background: var(--color-background);
    margin: 0;
  }
  nav.transition {
    transition: transform 0.3s ease-in-out;
  }
  nav.display {
    transform: translateY(0);
  }
  nav a {
    padding: 0.5rem;
    margin: 0.5rem 0;
  }
}
</style>
