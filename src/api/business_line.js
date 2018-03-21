const newParams = () => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }
}
const getBusinessLineList = (params = {}) => {
  return fetch('apiService/business/query', params)
}
const addBusinessLine = (params = newParams()) => {
  params.method = 'POST'
  params.headers = {
    'Content-Type': 'application/json'
  }
  return fetch('apiService/business/add', params)
}
const updateBusinessLine = (params = newParams()) => {
  params.method = 'POST'
  params.headers = {
    'Content-Type': 'application/json'
  }
  return fetch('apiService/business/update', params)
}
export {
  getBusinessLineList,
  addBusinessLine,
  updateBusinessLine
}
