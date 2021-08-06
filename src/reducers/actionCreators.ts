import * as actionTypes from './actionTypes'
import { Dispatch } from '.pnpm/@types+react@17.0.15/node_modules/@types/react'

export const queueRefresh = (dispatcher: Dispatch<Action>) => {
  const action: Action = {
    type: actionTypes.QUEUE_REFRESH,
    data: {
      dispatcher
    }
  }

  return action
}

export const updateDate = () => {
  const action: Action = {
    type: actionTypes.UPDATE_DATE
  }

  return action
}

export const setKey = (accessKey: string) => {
  const action: Action = {
    type: actionTypes.SET_KEY,
    data: {
      accessKey
    }
  }

  return action
}

export const fetchData = (dispatcher: Dispatch<Action>) => {
  const action: Action = {
    type: actionTypes.FETCH_DATA,
    data: {
      dispatcher
    }
  }

  return action
}

export const loginError = () => {
  const action: Action = {
    type: actionTypes.LOGIN_ERROR
  }

  return action
}

export const loginSuccess = () => {
  const action: Action = {
    type: actionTypes.LOGIN_SUCCESS
  }

  return action
}

export const setRig = (rig: IRig) => {
  const action: Action = {
    type: actionTypes.SET_RIG,
    data: {
      rig
    }
  }

  return action
}