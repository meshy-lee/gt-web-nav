import xhr from './inteceptor'
const getWebsiteList = (params = {}) => {
  return xhr('apiService/website/query', params)
}
const addWebsite = params => {
  params.method = 'POST'
  params.headers = {
    'Content-Type': 'application/json'
  }
  return xhr('apiService/website/add', params)
}
const updateWebsite = params => {
  return xhr('apiService/website/update', params)
}
export {
  getWebsiteList,
  addWebsite,
  updateWebsite
}
