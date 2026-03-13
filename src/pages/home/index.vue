<template>
  <view class="page">
    <t-tab-bar
      :value="activeTab"
      shape="round"
      theme="tag"
      :z-index="9999"
      :split="false"
      @change="onTabChange"
    >
      <t-tab-bar-item
        v-for="item in tabbarList"
        :key="item.value"
        :value="item.value"
        :icon="item.icon"
        :aria-label="item.ariaLabel"
      />
    </t-tab-bar>
  </view>
</template>

<script setup lang="ts">
// 首页 Tab 值类型
type HomeTab = 'schedule' | 'player' | 'team'

// 当前激活 Tab
const activeTab = ref<HomeTab>('schedule')

// 底部导航配置
const tabbarList = [
  {
    value: 'schedule',
    icon: 'time',
    ariaLabel: '赛历',
  },
  {
    value: 'player',
    icon: 'usergroup',
    ariaLabel: '球员',
  },
  {
    value: 'team',
    icon: 'dashboard',
    ariaLabel: '球队',
  },
] as const

// Tab 切换事件
const onTabChange = (e: { value: HomeTab }) => {
  activeTab.value = e.value
}
</script>
