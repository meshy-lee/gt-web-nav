import {FETCH_STARTED, FETCH_LOADING, FETCH_SUCCESS, FETCH_FAILURE, ADD_BUSINESS_LINE} from './actionTypes.js'

export const fetchMenuStart = () => ({type: FETCH_STARTED})

export const fetchMenuLoading = (result) => ({type: FETCH_LOADING, result})

export const fetchMenuSuccess = (result) => ({
  type: FETCH_SUCCESS,
  result
})

export const fetchMenuFailure = () => ({type: FETCH_FAILURE})

export const addBusinessLine = (result) => ({
  type: ADD_BUSINESS_LINE,
  result
})
