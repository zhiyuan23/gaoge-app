<template>
  <view class="page p-24 pb-220">
    <view class="bg-#fff p-24 rounded-24">
      <view class="text-#111827 font-600 text-32">
        我的信息
      </view>
      <view class="text-#6b7280 mt-8 text-24">
        资料基于 OpenID 静默绑定，可随时修改昵称和头像。
      </view>

      <view v-if="!profile" class="bg-#fff7ed mt-20 p-20 rounded-16 border-1-solid-#fed7aa">
        <view class="text-#9a3412 font-500 text-26">
          暂未获取到用户信息
        </view>
        <view class="text-#c2410c mt-8 text-24">
          请稍后重试或重新进入小程序。
        </view>
        <t-button class="mt-16" size="small" theme="primary" @click="refreshProfile">
          重新获取
        </t-button>
      </view>

      <view v-else class="mt-20">
        <view class="flex items-center gap-16">
          <image :src="profile.avatar" class="bg-#e5e7eb w-96 h-96 rounded-999" mode="aspectFill" />
          <view class="flex-1 min-w-0">
            <view class="truncate text-#111827 font-600 text-28">
              {{ profile.nickname }}
            </view>
            <view class="truncate text-#6b7280 mt-6 text-24">
              OpenID：{{ profile.openid }}
            </view>
          </view>
        </view>

        <view class="flex flex-col mt-20 gap-16">
          <view>
            <view class="text-#374151 mb-8 text-24">
              昵称
            </view>
            <input
              v-model="form.nickname"
              class="px-20 h-84 text-26 rounded-12 border-1-solid-#d1d5db"
              placeholder="请输入昵称"
              placeholder-class="text-#9ca3af"
            >
          </view>

          <view>
            <view class="text-#374151 mb-8 text-24">
              头像链接
            </view>
            <input
              v-model="form.avatar"
              class="px-20 h-84 text-26 rounded-12 border-1-solid-#d1d5db"
              placeholder="请输入头像 URL"
              placeholder-class="text-#9ca3af"
            >
          </view>
        </view>

        <view class="flex mt-24 gap-12">
          <t-button class="flex-1" size="small" theme="light" block @click="resetForm">
            重置
          </t-button>
          <t-button class="flex-1" size="small" theme="primary" block :loading="saving" @click="saveProfile">
            保存修改
          </t-button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { getCachedProfile, getUserProfile, syncUserProfile, updateUserProfile, type UserProfile } from '@/services/cloudUser'

const profile = ref<UserProfile | null>(null)
const saving = ref(false)

const form = reactive({
  nickname: '',
  avatar: '',
})

const applyProfile = (data: UserProfile | null) => {
  profile.value = data
  form.nickname = data?.nickname || ''
  form.avatar = data?.avatar || ''
}

const refreshProfile = async () => {
  const fresh = await getUserProfile()
  if (fresh) {
    applyProfile(fresh)
    return
  }

  const synced = await syncUserProfile()
  applyProfile(synced)
}

const resetForm = () => {
  if (!profile.value)
    return

  form.nickname = profile.value.nickname
  form.avatar = profile.value.avatar
}

const saveProfile = async () => {
  if (!profile.value)
    return

  saving.value = true
  try {
    const updated = await updateUserProfile({
      nickname: form.nickname,
      avatar: form.avatar,
    })
    applyProfile(updated)
    uni.showToast({ title: '保存成功', icon: 'success' })
  }
  catch (err) {
    console.error('更新用户资料失败', err)
    uni.showToast({ title: '保存失败', icon: 'none' })
  }
  finally {
    saving.value = false
  }
}

onMounted(async () => {
  const cached = getCachedProfile()
  if (cached)
    applyProfile(cached)

  try {
    await refreshProfile()
  }
  catch (err) {
    console.error('初始化用户资料失败', err)
  }
})
</script>
