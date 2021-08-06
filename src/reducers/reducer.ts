import * as actionTypes from './actionTypes'
import * as creators from './actionCreators'
import { Dispatch } from '.pnpm/@types+react@17.0.15/node_modules/@types/react'
import axios from 'axios'

const initialState: State = {
  rig: null,
  error: false,
  refreshDate: null,
  accessKey: null
}

const fetch = (key: string, dispatcher: Dispatch<Action>) => {
  const workers_url = `https://api.minerstat.com/v2/stats/${key}`
  axios
    .get<IMinerStat>(workers_url)
    .then(resp => {
      const entry = Object.entries(resp.data)[0]
      const name = entry[0]
      const status = entry[1].info.status
      const hashrate = entry[1].mining.hashrate.hashrate
      dispatcher(creators.setRig({ name, status, hashrate }))
      dispatcher(creators.updateDate())
      dispatcher(creators.loginSuccess())
      dispatcher(creators.queueRefresh(dispatcher))
    })
    .catch(() => {
      dispatcher(creators.loginError())
    })
}

const reducer = (state: State = initialState, action: Action): State => {
  console.log('state', state)
  console.log('action', action)

  switch (action.type) {
    case actionTypes.QUEUE_REFRESH: {
      const data = action.data as Data
      setTimeout(
        () => fetch(state.accessKey as string, data.dispatcher),
        60000
      )
      return state
    }

    case actionTypes.SET_KEY: {
      const data = action.data as Data
      return {...state, accessKey: data.accessKey as string}
    }

    case actionTypes.FETCH_DATA: {
      const data = action.data as Data
      fetch(state.accessKey as string, data.dispatcher)
      return state
    }

    case actionTypes.UPDATE_DATE:
      return {...state, refreshDate: new Date()}
    
    case actionTypes.SET_RIG: {
      const data = action.data as Data
      return {...state, rig: data.rig as IRig}
    }

    case actionTypes.LOGIN_ERROR:
      return {...state, error: true}

    case actionTypes.LOGIN_SUCCESS:
      return {...state, error: false}

    default:
      return state
  }
}

export default reducer