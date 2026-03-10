<template>
  <view class="page">
    <view class="w-full h-24" />
    <view class="schedule bg-#fff mx-20 pt-24 rounded-24">
      <t-calendar
        title="比赛日历"
        :value="selectedDate"
        :min-date="minDate"
        :max-date="maxDate"
        :locale-text="localeText"
        :format="formatCalendarDate"
        switch-mode="year-month"
        :use-popup="false"
        @change="onCalendarChange"
        @select="onCalendarSelect"
      />

      <view class="p-24">
        <view class="bg-#f8fafc mt-16 p-24 rounded-20">
          <view class="flex-center justify-between mb-12 text-26">
            <text class="text-#6b7280">
              已选日期
            </text>
            <text class="text-#111827 font-500">
              {{ selectedDateText }} {{ selectedWeekday }}
            </text>
          </view>

          <view class="flex-center justify-between mb-12 text-26">
            <text class="text-#6b7280">
              比赛日
            </text>
            <text class="text-#111827 font-500">
              {{ isSelectedMatchDay ? '是' : '否' }}
            </text>
          </view>

          <view class="flex-center justify-between mb-12 text-26">
            <text class="text-#6b7280">
              状态
            </text>
            <text class="rounded-full px-14 py-4 text-24" :class="selectedStatus.className">
              {{ selectedStatus.text }}
            </text>
          </view>

          <view class="text-#047857 mt-12 text-24">
            距离下一个比赛日还有 {{ daysToNextMatchDay }} 天
          </view>
        </view>

        <view class="flex mt-16 gap-16">
          <t-button
            class="flex-1"
            theme="light"
            size="small"
            block
            @click="goToToday"
          >
            回到今天
          </t-button>
          <t-button
            class="flex-1"
            theme="light"
            size="small"
            block
            @click="goToNextMatchDay"
          >
            下一个比赛日
          </t-button>
        </view>
      </view>
    </view>

    <view class="w-full h-200" />
  </view>
</template>

<script setup lang="ts">
// 周展示文案
const WEEKDAYS = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

// 当前时间戳（用于实时判断状态）
const nowTs = ref(Date.now())

// 当前选中的日期（当天零点）
const selectedDate = ref(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime())

// 可选最小日期：当前日期前一年
const minDate = computed(() => {
  const d = new Date(nowTs.value)
  d.setFullYear(d.getFullYear() - 1)
  return getStartOfDayTimestamp(d)
})

// 可选最大日期：当前日期后一年
const maxDate = computed(() => {
  const d = new Date(nowTs.value)
  d.setFullYear(d.getFullYear() + 1)
  return getStartOfDayTimestamp(d)
})

// 日历本地化文案
const localeText = {
  weekdays: WEEKDAYS,
}

// 节假日日期集合（年维度滚动）
const holidayDateSet = computed(() => {
  const year = new Date(nowTs.value).getFullYear()
  return new Set(buildDefaultHolidayDates([year - 1, year, year + 1]))
})

// 页面内定时器句柄
let timer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  timer = setInterval(() => {
    nowTs.value = Date.now()
  }, 60 * 1000)
})

onUnmounted(() => {
  if (timer)
    clearInterval(timer)
})

// 已选日期对象
const selectedDateObj = computed(() => new Date(selectedDate.value))

// 已选日期对应星期
const selectedWeekday = computed(() => WEEKDAYS[selectedDateObj.value.getDay()])

// 已选日期展示文本
const selectedDateText = computed(() => {
  const y = selectedDateObj.value.getFullYear()
  const m = String(selectedDateObj.value.getMonth() + 1).padStart(2, '0')
  const d = String(selectedDateObj.value.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
})

// 已选日期是否处于比赛赛季（4 月到 11 月）
const isSelectedInSeason = computed(() => isInMatchSeason(selectedDateObj.value))

// 已选日期是否为比赛日
const isSelectedMatchDay = computed(() => isMatchDay(selectedDateObj.value))

// 已选日期状态信息
const selectedStatus = computed(() => {
  if (!isSelectedMatchDay.value) {
    if (!isSelectedInSeason.value) {
      return {
        text: '冬歇期',
        shortText: '',
        className: 'text-purple-500 bg-purple-100',
      }
    }

    return {
      text: '非比赛日',
      shortText: '',
      className: 'text-gray-600 bg-gray-100',
    }
  }

  const status = getMatchStatus(selectedDateObj.value, nowTs.value)
  const classNameMap = {
    ended: 'text-orange-800 bg-orange-100',
    upcoming: 'text-blue-500 bg-blue-100',
    ongoing: 'text-green-600 bg-green-100',
  } as const

  return {
    ...status,
    className: classNameMap[status.tag],
  }
})

// 距离下一个比赛日的天数
const daysToNextMatchDay = computed(() => {
  const nextMatchDay = findNextMatchDay(new Date(nowTs.value), true)
  const diff = nextMatchDay.getTime() - getStartOfDayTimestamp(new Date(nowTs.value))
  return Math.floor(diff / (24 * 60 * 60 * 1000))
})

// 统一解析日历回调值
const resolveCalendarValue = (context: { value: number | number[] }) => {
  const rawValue = Array.isArray(context.value) ? context.value[0] : context.value
  return getStartOfDayTimestamp(new Date(rawValue))
}

// 日历 change 事件处理
const onCalendarChange = (context: { value: number | number[] }) => {
  selectedDate.value = resolveCalendarValue(context)
}

// 日历 select 事件处理（点击即更新）
const onCalendarSelect = (context: { value: number | number[] }) => {
  selectedDate.value = resolveCalendarValue(context)
}

// 快捷：回到今天
const goToToday = () => {
  selectedDate.value = getStartOfDayTimestamp(new Date(nowTs.value))
}

// 快捷：跳到下一个比赛日
const goToNextMatchDay = () => {
  selectedDate.value = getStartOfDayTimestamp(findNextMatchDay(new Date(selectedDate.value), false))
}

// 日历单元格格式化（比赛日打标）
const formatCalendarDate = (day: any) => {
  const date = new Date(day.date)

  if (!isMatchDay(date))
    return day

  const status = getMatchStatus(date, nowTs.value)
  return {
    ...day,
    className: `${day.className || ''} font-600 text-green-800 bg-green-100`,
    prefix: '⚽',
    suffix: status.shortText,
  }
}

// 获取日期零点时间戳
const getStartOfDayTimestamp = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
}

// 生成 yyyy-MM-dd 日期键
const getDateKey = (date: Date) => {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

// 构建默认节假日（可按业务扩展）
const buildDefaultHolidayDates = (years: number[]) => {
  const dates: string[] = []

  for (const year of years) {
    dates.push(
      `${year}-01-01`,
      `${year}-05-01`,
      `${year}-05-02`,
      `${year}-05-03`,
      `${year}-05-04`,
      `${year}-05-05`,
      `${year}-10-01`,
      `${year}-10-02`,
      `${year}-10-03`,
      `${year}-10-04`,
      `${year}-10-05`,
      `${year}-10-06`,
      `${year}-10-07`,
    )
  }

  return dates
}

// 判断是否节假日
const isHoliday = (date: Date) => {
  return holidayDateSet.value.has(getDateKey(date))
}

// 判断是否处于比赛赛季（4 月到 11 月）
const isInMatchSeason = (date: Date) => {
  const month = date.getMonth()
  return month >= 3 && month <= 10
}

// 判断是否比赛日（赛季内、非节假日、周二）
const isMatchDay = (date: Date) => {
  return isInMatchSeason(date) && date.getDay() === 2 && !isHoliday(date)
}

// 获取比赛日状态
const getMatchStatus = (date: Date, now: number) => {
  const target = getStartOfDayTimestamp(date)
  const today = getStartOfDayTimestamp(new Date(now))

  if (target < today) {
    return { text: '已结束', shortText: '已结束', tag: 'ended' as const }
  }
  if (target > today) {
    return { text: '未开始', shortText: '未开始', tag: 'upcoming' as const }
  }
  return { text: '进行中', shortText: '进行中', tag: 'ongoing' as const }
}

// 从指定日期起查找下一个比赛日
const findNextMatchDay = (baseDate: Date, includeToday: boolean) => {
  const d = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate())

  if (!includeToday)
    d.setDate(d.getDate() + 1)

  for (let i = 0; i < 370; i += 1) {
    if (isMatchDay(d))
      return d

    d.setDate(d.getDate() + 1)
  }

  return d
}
</script>

<style scoped>
:deep(.t-calendar__months) {
  height: auto !important;
  padding-bottom: 0 !important;
}

:deep(.t-calendar__title) {
  display: none !important;
}

:deep(.t-calendar__dates-item) {
  margin: 0 !important;
}
</style>
