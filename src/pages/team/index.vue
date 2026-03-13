<template>
  <view class="page p-24 pb-220">
    <view class="bg-#fff p-24 rounded-24">
      <view class="text-#111827 font-600 mb-16 text-32">
        球队资产
      </view>

      <view class="flex flex-col gap-12">
        <view
          v-for="asset in assets"
          :key="asset.name"
          class="p-16 rounded-16 border-1-solid-#e5e7eb"
        >
          <view class="flex items-center justify-between">
            <text class="text-#111827 font-500 text-28">
              {{ asset.name }}
            </text>
            <text class="text-#6b7280 text-24">
              数量：{{ asset.quantity }} {{ asset.unit }}
            </text>
          </view>
          <view class="flex items-center justify-between mt-8 text-24">
            <text class="text-#6b7280">
              估算单价：¥{{ asset.unitPrice }}
            </text>
            <text class="text-#065f46 font-600">
              资产值：¥{{ asset.totalValue }}
            </text>
          </view>
        </view>
      </view>

      <view class="flex items-center justify-between bg-#f8fafc mt-16 p-16 rounded-16">
        <text class="text-#374151 text-26">
          总资产估值
        </text>
        <text class="text-#065f46 font-700 text-30">
          ¥{{ totalAssetValue }}
        </text>
      </view>
    </view>

    <view class="bg-#fff mt-20 p-24 rounded-24">
      <view class="text-#111827 font-600 mb-16 text-32">
        财务信息
      </view>

      <view class="flex items-center justify-between bg-#eff6ff mb-16 p-16 rounded-16">
        <text class="text-#1e40af text-24">
          每场球队建设费
        </text>
        <text class="text-#1d4ed8 font-600 text-28">
          ¥{{ buildFeePerMatch }}
        </text>
      </view>

      <view class="flex flex-col gap-12">
        <view
          v-for="record in financeRecords"
          :key="record.id"
          class="p-16 rounded-16 border-1-solid-#e5e7eb"
        >
          <view class="flex items-center justify-between text-26">
            <text class="text-#111827 font-500">
              {{ record.title }}
            </text>
            <text class="text-#6b7280">
              {{ record.date }}
            </text>
          </view>
          <view class="flex items-center justify-between mt-10 text-24">
            <text class="text-#166534">
              收入：¥{{ record.income }}
            </text>
            <text class="text-#b91c1c">
              支出：¥{{ record.expense }}
            </text>
          </view>
          <view class="text-#6b7280 mt-8 text-24">
            备注：{{ record.remark }}
          </view>
        </view>
      </view>

      <view class="flex flex-col bg-#f8fafc mt-16 p-16 gap-8 rounded-16">
        <view class="flex items-center justify-between text-24">
          <text class="text-#6b7280">
            累计收入
          </text>
          <text class="text-#166534 font-600">
            ¥{{ totalIncome }}
          </text>
        </view>
        <view class="flex items-center justify-between text-24">
          <text class="text-#6b7280">
            累计支出
          </text>
          <text class="text-#b91c1c font-600">
            ¥{{ totalExpense }}
          </text>
        </view>
        <view class="flex items-center justify-between text-28">
          <text class="text-#111827 font-500">
            当前结余
          </text>
          <text class="font-700" :class="balance >= 0 ? 'text-#065f46' : 'text-#b91c1c'">
            ¥{{ balance }}
          </text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
interface AssetItem {
  name: string;
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

// 每场比赛建设费
const buildFeePerMatch = ref(120)

// 球队资产明细
const assets = ref<AssetItem[]>([
  { name: '比赛足球', quantity: 18, unit: '个', unitPrice: 188, totalValue: 3384 },
  { name: '训练横幅', quantity: 6, unit: '条', unitPrice: 96, totalValue: 576 },
  { name: '守门员手套', quantity: 8, unit: '副', unitPrice: 238, totalValue: 1904 },
  { name: '训练背心', quantity: 30, unit: '件', unitPrice: 58, totalValue: 1740 },
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
</script>
