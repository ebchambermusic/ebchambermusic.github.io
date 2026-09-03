import { ref, computed } from "vue"

const mainData = ref(null)
const isLoading = ref(false)
const error = ref(null)

export function useMainData() {
  const fetchMainData = async () => {
    if (mainData.value) return

    isLoading.value = true
    error.value = null

    try {
      const response = await fetch("/data.json")
      if (!response.ok) {
        throw new Error(`failed to load data: ${response.statusText}`)
      }
      const result = await response.json()
      mainData.value = result || null
    } catch (err) {
      error.value = err.message || "an error occurred"
    } finally {
      isLoading.value = false
    }
  }

  const getSubData = (obj, path) => {
    if (!obj) return undefined
    const cleanPath = path.replace(/\[(\d+)\]/g, ".$1")
    const keys = cleanPath.split(".").filter(Boolean)
    return keys.reduce((level, key) => level?.[key], obj)
  }

  const subData = (path, fallback = "") => {
    return computed(() => {
      const value = getSubData(mainData.value, path)
      return value !== undefined && value !== null ? value : fallback
    })
  }

  return {
    mainData,
    isLoading,
    error,
    fetchMainData,
    subData,
  }
}

export function useToggle() {
  const currentIndex = ref(null)
  const toggle = (index) => {
    if (currentIndex.value === index) {
      currentIndex.value = null
    } else {
      currentIndex.value = index
    }
  }
  return { currentIndex, toggle }
}

export function useMerge() {
  function merge(main, related) {
    let index = 0
    return main.map(event => {
      const performances = []
      let temp = index;
      while (temp < related.length && related[temp].eventId !== event.eventId) {
        temp++
      }
      if (temp < related.length) {
        index = temp;
        while (index < related.length && related[index].eventId === event.eventId) {
          performances.push(related[index])
          index++
        }
      }
      return { ...event, performances }
    })
  }
  return { merge }
}
