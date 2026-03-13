/**
 * 云对象调用封装
 */
export interface UniCloudResponse<T = any> {
  code: number;
  message?: string;
  data?: T;
}

/**
 * 封装云对象调用核心方法
 */
export async function callCloudObj<T = any>(
  cloudObjectName: string,
  methodName: string,
  params: Record<string, any> = {},
  options: UniCloud.ImportObjectOptions = {},
): Promise<UniCloudResponse<T>> {
  try {
    const cloudObj = uniCloud.importObject(cloudObjectName, {
      customUI: true, // 关闭默认 loading
      ...options,
    })

    const res: UniCloudResponse<T> = await cloudObj[methodName](params)

    if (res.code !== 200) {
      throw new Error(res.message || '请求失败')
    }

    return res
  }
  catch (error) {
    handleCloudError(error)
    throw error
  }
}

/**
 * 云端统一错误处理
 */
function handleCloudError(error: any): void {
  console.error('[Cloud Error]', error)

  const errMsg = error.message || '网络请求失败'
  uni.showToast({ title: errMsg, icon: 'none' })
}
