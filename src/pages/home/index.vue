<template>
  <view class="page">
    <view class="mx-20 pt-20">
      <t-swiper
        :current="1"
        :autoplay="true"
        :duration="500"
        :interval="5000"
        :list="swiperList"
        :navigation="{ type: 'dots-bar' }"
      />
    </view>

    <t-tab-bar
      :value="currentTab"
      shape="round"
      theme="tag"
      :split="false"
      @change="onChange"
    >
      <t-tab-bar-item
        v-for="(item, index) in tabbarList"
        :key="index"
        :value="item.value"
        :icon="item.icon"
        :aria-label="item.ariaLabel"
      />
    </t-tab-bar>
  </view>
</template>

<script setup lang="ts">
const imageCdn = 'https://tdesign.gtimg.com/mobile/demos'

// 轮播图
const swiperList = [
  {
    value: `${imageCdn}/swiper1.png`,
    ariaLabel: '图片1',
  },
  {
    value: `${imageCdn}/swiper2.png`,
    ariaLabel: '图片2',
  },
  {
    value: `${imageCdn}/swiper1.png`,
    ariaLabel: '图片1',
  },
  {
    value: `${imageCdn}/swiper2.png`,
    ariaLabel: '图片2',
  },
]

// 底部导航
const currentTab = ref('home')
const tabbarList = ref([
  {
    value: 'home',
    icon: 'home',
    ariaLabel: '首页',
  },
  {
    value: 'app',
    icon: 'app',
    ariaLabel: '软件',
  },
  {
    value: 'chat',
    icon: 'chat',
    ariaLabel: '聊天',
  },
  {
    value: 'user',
    icon: 'user',
    ariaLabel: '我的',
  },
])

const onChange = (e: any) => {
  currentTab.value = e.value
}
</script>
