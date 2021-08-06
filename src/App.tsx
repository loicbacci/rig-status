import React from 'react'
import { useSelector } from 'react-redux'
import Loading from './components/Loading'
import RigStatus from './components/RigStatus'


const App = () => {
  const rig = useSelector<State, State['rig']>(state => state.rig)

  if (rig) {
    return <RigStatus />
  } else {
    return <Loading />
  }
}

export default App
