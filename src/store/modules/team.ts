import type { AssetListParams } from '@/api/modules/team/types'
import {
  getAssetListApi,
  getFinanceDetailApi,
} from '@/api/modules/team'

const useTeamStore = defineStore(
  // 唯一 ID
  'team',
  () => {
    const teamAssets = ref()
    const teamFinance = ref({
      total_income: 0,
      total_expense: 0,
      balance: 0,
    })

    /**
     * 球队资金
     * @param params
     */
    async function getAssetList(params?: AssetListParams) {
      const { data } = await getAssetListApi(params)
      teamAssets.value = data?.list
    }

    /**
     * 球队资产
     */
    async function getFinanceDetail() {
      const { data } = await getFinanceDetailApi()
      teamFinance.value = data
    }

    return {
      teamAssets,
      teamFinance,
      getAssetList,
      getFinanceDetail,
    }
  },
)

export default useTeamStore
