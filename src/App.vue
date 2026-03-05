<script setup lang="ts">
onLaunch(async () => {
  console.log('App Launch')
})

onShow(() => {
  console.log('App Show')
})

onHide(() => {
  console.log('App Hide')
})
</script>

<style lang="scss">
/* 每个页面公共css */
@import '@/static/styles/common.scss';
</style>
