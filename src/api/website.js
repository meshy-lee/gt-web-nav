import xhr from './inteceptor'
const queryWebsiteList = (params = {}) => {
  params.method = 'GET'
  const url = `/apiService/website/query?belong=${params.belong}`
  return xhr(url, params)
}
const addWebsite = params => {
  params.method = 'POST'
  params.headers = {
    'Content-Type': 'application/json'
  }
  return xhr('/apiService/website/add', params)
}
const updateWebsite = params => {
  params.method = 'PUT'
  params.headers = {
    'Content-Type': 'application/json'
  }
  return xhr('/apiService/website/update', params)
}
const deleteWebsite = params => {
  params.method = 'DELETE'
  params.headers = {
    'Content-Type': 'application/json'
  }
  // console.log(params)
  const url = `/apiService/website/delete/${params.id}`
  return xhr(url, params)
}
export {
  queryWebsiteList,
  addWebsite,
  updateWebsite,
  deleteWebsite
}
