import xhr from './inteceptor'
const uploadImg = (params = {}) => {
  params.method = 'POST'
  params.headers = {}
  // 'Content-Type': 'application/x-www-form-urlencoded'
  // 'enctype': 'multipart/form-data'
  // console.log(params)
  return xhr('/uploadImg', params)
}
export {
  uploadImg
}
