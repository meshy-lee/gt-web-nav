import xhr from './inteceptor'
const getBusinessLineList = (params = {}) => {
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
  // params.method = 'POST'
  // params.headers = {
  //   'Content-Type': 'application/json'
  // }
  // return fetch('apiService/business/update', params)
  return xhr('/apiService/business/update', params)
}
const deleteBusinessLine = params => {
  return xhr('/apiService/business/delete', params)
}
export {
  getBusinessLineList,
  addBusinessLine,
  updateBusinessLine,
  deleteBusinessLine
}
