import {FETCH_STARTED, FETCH_SUCCESS, FETCH_FAILURE} from './action_types.js'
import {queryBusinessLineList} from '@/api/business_line'
import {GlobalLoading} from '@/components/index'
export const fetchMenuStart = () => ({type: FETCH_STARTED})

export const fetchMenuSuccess = (data) => ({
  type: FETCH_SUCCESS,
  data
})

export const fetchMenuFailure = () => ({type: FETCH_FAILURE})

export const fetchBusinessLine = () => {
  let gl = GlobalLoading()
  return (dispatch) => {
    dispatch(fetchMenuStart())
    queryBusinessLineList().then(res => {
      gl()
      if (res.result) dispatch(fetchMenuFailure())
      else dispatch(fetchMenuSuccess(res.data))
    }, res => {
      gl()
    })
  }
}
