import * as actionTypes from './action_types'
export default(state = {}, action) => {
  let result
  switch (action.type) {
    case actionTypes.FETCH_STARTED:
      result = {...state, msg: 'start'}
      return result
    case actionTypes.FETCH_LOADING:
      result = {...state, msg: 'loading'}
      return result
    case actionTypes.FETCH_SUCCESS:
      result = {...state, msg: 'success'}
      return result
    case actionTypes.FETCH_FAILURE:
      result = {...state, msg: 'failure'}
      return result
    case actionTypes.ADD_BUSINESS_LINE:
      result = {...state, msg: 'add_business_line'}
      return result
    default:
      return {...state, msg: 'static'}
  }
}
