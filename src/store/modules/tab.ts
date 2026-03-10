export const useTabStore = defineStore(
  'tab',
  () => {
    const activeTab = ref<string>('schedule')

    const setActiveTab = (value: string) => {
      activeTab.value = value
    }

    return {
      activeTab,
      setActiveTab,
    }
  },
)

export default useTabStore
