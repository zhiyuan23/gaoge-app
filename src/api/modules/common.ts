// 上传图片
export async function uploadToCloud(tempFilePath: string, path: string = 'image'): Promise<string> {
  const cloudPath = `${path}/${Date.now()}.jpg`

  const res = await uniCloud.uploadFile({
    filePath: tempFilePath,
    cloudPath,
  })

  return res.fileID
}
