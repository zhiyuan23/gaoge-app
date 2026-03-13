<template>
  <t-tab-bar
    :value="activeTab"
    shape="round"
    theme="tag"
    :z-index="9999"
    :split="false"
    @change="handleTabChange"
  >
    <t-tab-bar-item
      v-for="item in tabItems"
      :key="item.value"
      :value="item.value"
      :icon="item.icon"
      :text="item.text"
      :aria-label="item.ariaLabel"
      active-color="#0052d9"
      color="#E4F9E9"
    />
  </t-tab-bar>
</template>

<script setup lang="ts">
import { useTabStore } from '@/store'

const tabStore = useTabStore()
const { activeTab } = storeToRefs(tabStore)

type TabValue = 'schedule' | 'player' | 'team'

const tabItems = [
  {
    value: 'schedule' as const,
    icon: 'time',
    text: '赛历',
    ariaLabel: '赛历',
    path: '/pages/schedule/index',
  },
  {
    value: 'player' as const,
    icon: 'dashboard',
    text: '球员',
    ariaLabel: '球员',
    path: '/pages/player/index',
  },
  {
    value: 'team' as const,
    icon: 'dashboard',
    text: '球队',
    ariaLabel: '球队',
    path: '/pages/team/index',
  },
] as const

// Tab 切换处理
const handleTabChange = (e: { value: TabValue }) => {
  const selected = tabItems.find(item => item.value === e.value)
  if (selected) {
    tabStore.setActiveTab(e.value)

    uni.switchTab({
      url: selected.path,
    })
  }
}
</script>

<style lang="scss" scoped>
.t-tab-bar {
  height: 100rpx !important;
  background-color: #ffffff !important;
  z-index: 9999;
  --td-tab-bar-bg-color : #E4F9E9 !important;
}
</style>
