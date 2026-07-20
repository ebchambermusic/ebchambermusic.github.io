import { ref, onMounted, onUnmounted } from "vue"

export function checkMedia(query) {
  const matches = ref(false)
  let mediaList = null

  const updateMatches = (event) => {
    matches.value = event.matches
  }

  onMounted(() => {
    mediaList = window.matchMedia(query)
    matches.value = mediaList.matches
    mediaList.addEventListener("change", updateMatches)
  })

  onUnmounted(() => {
    if (mediaList) {
      mediaList.removeEventListener("change", updateMatches)
    }
  })

  return matches
}
