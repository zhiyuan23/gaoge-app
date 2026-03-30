<template>
  <view class="page p-24 pb-220">
    <!-- 球队基本信息卡片 -->
    <view class="overflow-hidden bg-#fff rounded-24">
      <view class="relative from-primary to-#7FBE26 bg-gradient-to-r h-160">
        <view class="absolute opacity-10 top-0 right-0 bottom-0 left-0">
          <view class="flex flex-wrap justify-end pr-10 pt-20">
            <text class="text-white font-800 opacity-50 text-120">
              ⚽
            </text>
          </view>
        </view>
        <view class="absolute from-white to-transparent bg-gradient-to-t h-60 right-0 bottom-0 left-0" />
      </view>

      <view class="relative px-24 pb-24 -mt-80">
        <view class="flex items-end gap-20">
          <view class="bg-#fff shadow-lg p-4 rounded-20">
            <view class="flex items-center justify-center from-primary to-#7FBE26 bg-gradient-to-br w-140 h-140 rounded-16">
              <text class="text-white font-800 text-60">
                {{ teamInfo.abbr }}
              </text>
            </view>
          </view>
          <view class="flex-1 pb-8">
            <view class="flex items-center gap-12">
              <text class="text-#111827 font-700 text-36">
                {{ teamInfo.name }}
              </text>
              <view class="rounded-full bg-primary/10 px-10 py-4">
                <text class="text-primary font-500 text-20">
                  {{ teamInfo.level }}
                </text>
              </view>
            </view>
            <view class="flex items-center mt-8 gap-16">
              <view class="flex items-center gap-8">
                <text class="i-mdi:map-marker text-#6b7280 text-28" />
                <text class="text-#6b7280 text-24">
                  {{ teamInfo.location }}
                </text>
              </view>
              <view class="flex items-center gap-8">
                <text class="i-mdi:calendar text-#6b7280 text-28" />
                <text class="text-#6b7280 text-24">
                  成立于 {{ teamInfo.foundedYear }}
                </text>
              </view>
            </view>
          </view>
        </view>

        <view class="grid grid-cols-4 mt-24 gap-16">
          <view
            v-for="(stat, index) in teamStats"
            :key="index"
            class="flex flex-col items-center bg-#f8fafc p-16 rounded-16"
          >
            <text class="text-primary font-700 text-32">
              {{ stat.value }}
            </text>
            <text class="text-#6b7280 mt-6 text-22">
              {{ stat.label }}
            </text>
          </view>
        </view>

        <view class="flex items-center mt-20 gap-8">
          <view
            v-for="color in teamInfo.colors"
            :key="color"
            class="flex-1 h-12 rounded-8"
            :style="{ backgroundColor: color }"
          />
        </view>
      </view>
    </view>

    <!-- 资产总览卡片 -->
    <view class="overflow-hidden bg-#fff mt-20 rounded-24">
      <view class="flex items-center justify-between px-24 pt-24">
        <view class="flex items-center gap-12">
          <view class="flex items-center justify-center from-#059669 to-#10b981 bg-gradient-to-br w-48 h-48 rounded-12">
            <text class="i-mdi:treasure-chest text-white text-28" />
          </view>
          <view>
            <text class="text-#111827 font-700 text-32">
              资产总览
            </text>
            <text class="text-#6b7280 mt-4 text-24">
              共 {{ assets.length }} 类资产
            </text>
          </view>
        </view>
        <view class="text-right">
          <text class="text-#6b7280 text-22">
            总资产估值
          </text>
          <view class="flex items-baseline gap-4">
            <text class="text-primary font-600 text-24">
              ¥
            </text>
            <text class="text-primary font-800 text-36">
              {{ formatNumber(totalAssetValue) }}
            </text>
          </view>
        </view>
      </view>

      <view class="px-24 py-20">
        <view class="flex flex-col gap-12">
          <view
            v-for="asset in assets"
            :key="asset.id"
            class="transition-all duration-300 p-18 rounded-20 border-1-solid-#e5e7eb hover:border-primary/30 hover:bg-primary/5"
          >
            <view class="flex items-center justify-between">
              <view class="flex items-center gap-16">
                <view class="flex items-center justify-center w-80 h-80 rounded-16" :style="{ backgroundColor: asset.bgColor }">
                  <text :class="asset.icon" class="text-36" :style="{ color: asset.iconColor }" />
                </view>
                <view>
                  <text class="text-#111827 font-600 text-28">
                    {{ asset.name }}
                  </text>
                  <text class="text-#6b7280 mt-4 text-24">
                    {{ asset.quantity }} {{ asset.unit }}
                  </text>
                </view>
              </view>
              <view class="text-right">
                <text class="text-#6b7280 text-24">
                  单价 ¥{{ formatNumber(asset.unitPrice) }}
                </text>
                <view class="mt-4">
                  <text class="text-#065f46 font-700 text-30">
                    ¥{{ formatNumber(asset.totalValue) }}
                  </text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 资金总览卡片 -->
    <view class="overflow-hidden bg-#fff mt-20 rounded-24">
      <view class="flex items-center justify-between px-24 pt-24">
        <view class="flex items-center gap-12">
          <view class="flex items-center justify-center from-#2563eb to-#3b82f6 bg-gradient-to-br w-48 h-48 rounded-12">
            <text class="i-mdi:cash text-white text-28" />
          </view>
          <view>
            <text class="text-#111827 font-700 text-32">
              资金总览
            </text>
            <text class="text-#6b7280 mt-4 text-24">
              近 {{ financeRecords.length }} 场比赛
            </text>
          </view>
        </view>
      </view>

      <view class="mt-20 px-24">
        <view class="grid grid-cols-3 gap-16">
          <view class="bg-#f0fdf4 p-20 rounded-20 border-1-solid-#86efac">
            <text class="text-#166534 text-24">
              累计收入
            </text>
            <view class="flex items-baseline mt-8 gap-4">
              <text class="text-#166534 font-600 text-22">
                ¥
              </text>
              <text class="text-#166534 font-800 text-36">
                {{ formatNumber(totalIncome) }}
              </text>
            </view>
          </view>
          <view class="bg-#fef2f2 p-20 rounded-20 border-1-solid-#fecaca">
            <text class="text-#991b1b text-24">
              累计支出
            </text>
            <view class="flex items-baseline mt-8 gap-4">
              <text class="text-#991b1b font-600 text-22">
                ¥
              </text>
              <text class="text-#991b1b font-800 text-36">
                {{ formatNumber(totalExpense) }}
              </text>
            </view>
          </view>
          <view class="bg-#eff6ff p-20 rounded-20 border-1-solid-#bfdbfe">
            <text class="text-#1e40af text-24">
              当前结余
            </text>
            <view class="flex items-baseline mt-8 gap-4">
              <text class="font-600 text-22" :class="balance >= 0 ? 'text-#065f46' : 'text-#991b1b'">
                ¥
              </text>
              <text class="font-800 text-36" :class="balance >= 0 ? 'text-#065f46' : 'text-#991b1b'">
                {{ formatNumber(balance) }}
              </text>
            </view>
          </view>
        </view>
      </view>

      <view class="mt-24 px-24">
        <view class="flex items-center justify-between">
          <text class="text-#111827 font-600 text-26">
            财务流水
          </text>
          <view class="flex items-center rounded-full bg-#eff6ff px-14 py-6 gap-8">
            <text class="text-#1e40af text-22">
              每场建设费 ¥{{ formatNumber(buildFeePerMatch) }}
            </text>
          </view>
        </view>
      </view>

      <view class="px-24 py-20">
        <view class="flex flex-col gap-12">
          <view
            v-for="record in financeRecords"
            :key="record.id"
            class="bg-#f8fafc p-18 rounded-20"
          >
            <view class="flex items-center justify-between">
              <view>
                <text class="text-#111827 font-600 text-28">
                  {{ record.title }}
                </text>
                <text class="text-#6b7280 mt-4 text-24">
                  {{ record.date }}
                </text>
              </view>
              <view class="flex items-center gap-24">
                <view class="text-right">
                  <text class="text-#6b7280 text-22">
                    收入
                  </text>
                  <text class="text-#166534 font-600 mt-2 text-28">
                    +¥{{ formatNumber(record.income) }}
                  </text>
                </view>
                <view class="text-right">
                  <text class="text-#6b7280 text-22">
                    支出
                  </text>
                  <text class="text-#991b1b font-600 mt-2 text-28">
                    -¥{{ formatNumber(record.expense) }}
                  </text>
                </view>
              </view>
            </view>
            <view class="flex items-center mt-12 pt-12 gap-8 border-t-1-solid-#e5e7eb">
              <text class="i-mdi:note-text-outline text-#9ca3af text-24" />
              <text class="text-#6b7280 text-24">
                {{ record.remark }}
              </text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
interface TeamInfo {
  name: string;
  abbr: string;
  level: string;
  location: string;
  foundedYear: number;
  colors: string[];
}

interface TeamStat {
  label: string;
  value: number | string;
}

interface AssetItem {
  id: string;
  name: string;
  icon: string;
  bgColor: string;
  iconColor: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalValue: number;
}

interface FinanceRecord {
  id: string;
  title: string;
  date: string;
  income: number;
  expense: number;
  remark: string;
}

// 球队基本信息
const teamInfo = ref<TeamInfo>({
  name: '高歌 FC',
  abbr: 'GG',
  level: '业余强队',
  location: '辽宁沈阳',
  foundedYear: 2018,
  colors: ['#007E41', '#7FBE26', '#F77600'],
})

// 球队统计数据
const teamStats = ref<TeamStat[]>([
  { label: '球员', value: 28 },
  { label: '比赛', value: 156 },
  { label: '胜率', value: '68%' },
  { label: '进球', value: 428 },
])

// 每场比赛建设费
const buildFeePerMatch = ref(120)

// 球队资产明细
const assets = ref<AssetItem[]>([
  {
    id: 'a-001',
    name: '比赛足球',
    icon: 'i-mdi:soccer',
    bgColor: '#dcfce7',
    iconColor: '#16a34a',
    quantity: 18,
    unit: '个',
    unitPrice: 188,
    totalValue: 3384,
  },
  {
    id: 'a-002',
    name: '训练横幅',
    icon: 'i-mdi:flag-triangle',
    bgColor: '#fef3c7',
    iconColor: '#d97706',
    quantity: 6,
    unit: '条',
    unitPrice: 96,
    totalValue: 576,
  },
  {
    id: 'a-003',
    name: '守门员手套',
    icon: 'i-mdi:hand-front-left',
    bgColor: '#dbeafe',
    iconColor: '#2563eb',
    quantity: 8,
    unit: '副',
    unitPrice: 238,
    totalValue: 1904,
  },
  {
    id: 'a-004',
    name: '训练背心',
    icon: 'i-mdi:tshirt-crew',
    bgColor: '#fce7f3',
    iconColor: '#db2777',
    quantity: 30,
    unit: '件',
    unitPrice: 58,
    totalValue: 1740,
  },
])

// 财务流水
const financeRecords = ref<FinanceRecord[]>([
  {
    id: 'f-001',
    title: '联赛第 7 轮',
    date: '2026-03-02',
    income: 1680,
    expense: 420,
    remark: '购入训练足球 2 个',
  },
  {
    id: 'f-002',
    title: '联赛第 8 轮',
    date: '2026-03-05',
    income: 1800,
    expense: 560,
    remark: '购入守门员手套 2 副',
  },
  {
    id: 'f-003',
    title: '联赛第 9 轮',
    date: '2026-03-08',
    income: 1920,
    expense: 280,
    remark: '场地横幅维护与运输',
  },
])

// 总资产估值
const totalAssetValue = computed(() => assets.value.reduce((sum, item) => sum + item.totalValue, 0))

// 财务累计收入
const totalIncome = computed(() => financeRecords.value.reduce((sum, item) => sum + item.income, 0))

// 财务累计支出
const totalExpense = computed(() => financeRecords.value.reduce((sum, item) => sum + item.expense, 0))

// 当前资金结余
const balance = computed(() => totalIncome.value - totalExpense.value)

// 格式化数字
const formatNumber = (num: number) => {
  return num.toLocaleString('zh-CN')
}
</script>
