import request from '../../../services/request'

export const onUploadImg = async file => {
  const formData = new FormData()
  formData.append('file', file)
  const res = await request({
    url: '/upload/file',
    data: formData,
    method: 'post'
  })
  return res.data.url
}
