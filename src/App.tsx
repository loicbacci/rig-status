import React, { useState } from 'react'
import axios from 'axios'
import { IMinerStat } from './types'

interface IRig {
  name: string
  status: string
  hashrate: number
}

interface LoadingProps {
  errorFound: boolean,
  formSubmitHandler: React.FormEventHandler<HTMLFormElement>,
  apiKey: string,
  setApiKey: React.Dispatch<React.SetStateAction<string>>,
}

const Loading = (props: LoadingProps) => {
  const { errorFound, formSubmitHandler, apiKey, setApiKey } = props
  //e => { e.preventDefault(); updateData() }

  const backColor = errorFound ? 'bg-red-300' : 'bg-yellow-300'
  const borderColor = errorFound ? 'border-red-600' : 'border-yellow-600'
  const buttonColor = errorFound ? 'bg-red-600' : 'bg-yellow-600'
  const buttonHoverColor = errorFound ? 'bg-red-700' : 'bg-yellow-700'

  return (
    <div className={`flex flex-col h-screen text-center ${backColor}`}>
      <form className="m-auto" onSubmit={formSubmitHandler}>
        <label className="block text-3xl font-semibold mb-4" htmlFor="password">
          {!errorFound ? '' : <div className="mb-4 text-4xl font-bold">Wrong key entered!</div>}
          Enter API key
        </label>

        <div className="flex flex-row">
          <input
            className={`shadow appearance-none border ${borderColor} rounded w-full py-2 px-3 mr-4 leading-tight focus:outline-none focus:shadow-outline`}
            id="password"
            type="password"
            placeholder="******************"
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
          />
          <button type="submit" className={`${buttonColor} hover:${buttonHoverColor} text-white font-bold py-2 px-4 rounded`}>Done</button>
        </div>
      </form>
    </div>
  )
}


interface RigStatusProps {
  rig: IRig,
  refreshDate: Date
}

const RigStatus = (props: RigStatusProps) => {
  const { rig, refreshDate } = props

  const statusClass = rig.status === 'offline' ? 'bg-red-300' : 'bg-green-300'

  const backClasses = `flex flex-col h-screen text-center ${statusClass} p-6`

  return (
    <div className={backClasses}>
      <div className='m-auto'>
        <div className='font-semibold text-4xl'>{rig.name}</div>
        <div className='font-normal text-xl'>{rig.status} - {rig.hashrate.toFixed(2)} MH/s</div>
      </div>

      <div className='font-semibold'>Last refresh</div>
      <div>{refreshDate.toTimeString()}</div>
    </div>
  )
}


const App = () => {
  const [rig, setRig] = useState<IRig>({} as IRig)
  const [initialized, setInitialized] = useState(false)
  const [apiKey, setApiKey] = useState('')
  const [refreshDate, setRefreshDate] = useState(new Date())
  const [errorFound, setErrorFound] = useState(false)

  let timer: NodeJS.Timeout

  const updateData = () => {
    clearTimeout(timer)
    console.log('updating')

    const workers_url = `https://api.minerstat.com/v2/stats/${apiKey}`
    axios
      .get<IMinerStat>(workers_url)
      .then(resp => {
        const entry = Object.entries(resp.data)[0]
        const name = entry[0]
        const status = entry[1].info.status
        const hashrate = entry[1].mining.hashrate.hashrate
        setRig({ name, status, hashrate })
        setInitialized(true)
        setRefreshDate(new Date())
        setErrorFound(false)
        queueRefresh()
      })
      .catch(() => setErrorFound(true))
  }

  const queueRefresh = () => {
    timer = setTimeout(updateData, 60000)
  }

  if (initialized) {
    return <RigStatus rig={rig} refreshDate={refreshDate} />
  } else {
    return (
      <Loading
        errorFound={errorFound}
        formSubmitHandler={e => { e.preventDefault(); updateData() }}
        apiKey={apiKey}
        setApiKey={setApiKey}
      />
    )
  }

}

export default App
