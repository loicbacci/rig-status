import React from 'react'
import { useSelector } from 'react-redux'

const Refresh = () => {
  const refreshDateInit = useSelector<State, State['refreshDate']>(s => s.refreshDate)

  if (!refreshDateInit) {
    return <div></div>
  }

  const refreshDate = refreshDateInit as Date

  return (
    <div>
      <div className='font-semibold'>Last refresh</div>
      <div>{refreshDate.toTimeString()}</div>
    </div>
  )
}

const RigStatus = () => {
  const rigInit = useSelector<State, State['rig']>(state => state.rig)
  
  if (!rigInit) {
    return <div></div>
  }

  const rig = rigInit as IRig

  const statusClass = rig.status === 'offline' ? 'bg-red-300' : 'bg-green-300'

  const backClasses = `flex flex-col h-screen text-center ${statusClass} p-6`

  return (
    <div className={backClasses}>
      <div className='m-auto'>
        <div className='font-semibold text-4xl'>
          {rig.name}
        </div>
        <div className='font-normal text-xl'>
          {rig.status} - {rig.hashrate.toFixed(2)} MH/s
        </div>
      </div>

      <Refresh />
    </div>
  )
}

export default RigStatus
