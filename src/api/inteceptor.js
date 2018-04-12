import React from 'react'
const xhr = (url, params) => {
  const statusMap = {
    '400': '参数错误',
    '401': '未登录或授权信息过期，请重新登录',
    '404': '请求地址无效',
    '500': '服务器错误',
    '502': '服务器错误',
    '504': '请求超时'
  }
  const promise = new Promise((resolve, reject) => {
    fetch(url, params).then(res => {
      const status = res.status
      const msg = statusMap[status] || '未知错误'
      if (statusMap[status]) {
        React.$toast({
          type: 'error',
          message: msg
        })
      } else {
        res.json().then(responseJson => {
          if (!responseJson.result) {
            resolve(responseJson)
          } else {
            React.$toast({
              type: 'error',
              message: responseJson.errInfo
            })
          }
        }).catch(errRes => {
          reject(errRes)
        })
      }
    }, errRes => {
      reject(errRes)
    })
  })
  return promise
}
export default xhr
