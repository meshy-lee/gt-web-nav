import * as actionTypes from './action_types'
const Status = {
  start: 'start',
  success: 'success',
  failure: 'failure'
}
export default(state = {}, action) => {
  let result
  switch (action.type) {
    case actionTypes.FETCH_STARTED:
      result = {...state, status: Status.start}
      return result
    case actionTypes.FETCH_SUCCESS:
      let {data, ...other} = action
      result = {status: Status.success, data: action.data}
      return result
    case actionTypes.FETCH_FAILURE:
      result = {...state, status: Status.failure}
      return result
    default:
      return {status: 'static', data: []}
  }
}
