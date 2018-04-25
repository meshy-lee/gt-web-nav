import xhr from './inteceptor'
const queryBusinessLineList = (params = {}) => {
  return xhr('/apiService/business/query', params)
}
const addBusinessLine = params => {
  params.method = 'POST'
  params.headers = {
    'Content-Type': 'application/json'
  }
  return xhr('/apiService/business/add', params)
}
const updateBusinessLine = params => {
  params.method = 'PUT'
  params.headers = {
    'Content-Type': 'application/json'
  }
  // return fetch('apiService/business/update', params)
  return xhr('/apiService/business/update', params)
}
const deleteBusinessLine = params => {
  params.method = 'DELETE'
  params.headers = {
    'Content-Type': 'application/json'
  }
  console.log(params)
  const url = `/apiService/business/delete/${params.id}`
  return xhr(url, params)
}
export {
  queryBusinessLineList,
  addBusinessLine,
  updateBusinessLine,
  deleteBusinessLine
}
