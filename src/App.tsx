import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IMinerStat } from './types';

interface IRig {
  name: string;
  status: string;
  hashrate: number;
}

const App = () => {
  const [rig, setRig] = useState<IRig>({} as IRig);
  const [initialized, setInitialized] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [refreshDate, setRefreshDate] = useState(new Date())

  let timer: NodeJS.Timeout

  const updateData = () => {
    clearTimeout(timer)
    if (apiKey === '') return;
    
    const workers_url = `https://api.minerstat.com/v2/stats/${apiKey}`;
    axios
      .get<IMinerStat>(workers_url)
      .then(resp => {
        const entry = Object.entries(resp.data)[0];
        const name = entry[0];
        const status = entry[1].info.status;
        const hashrate = entry[1].mining.hashrate.hashrate;
        setRig({name, status, hashrate})
        setInitialized(true);
        setRefreshDate(new Date())
        queueRefresh()
      });
  }

  const queueRefresh = () => {
    timer = setTimeout(updateData, 5000)
  }

  useEffect(updateData, [apiKey]);

  useEffect(() => {
    const key = process.env.REACT_APP_MINERSTAT_KEY
    if (key === undefined) {
      setApiKey(prompt('Enter the minerstat API key', '') as string);
    } else {
      setApiKey(key);
    }
    
  }, []);

  if (initialized === false) {
    return (
      <div className={`flex h-screen text-center bg-yellow-300 p-6`}>
        <div className='m-auto text-4xl'>Loading...</div>
      </div>
    );
  }

  document.body.className = status;

  const statusColor = rig.status === 'offline' ? 'red' : 'green'
  const statusClass = `bg-${statusColor}-300`
  // const borderClass = `border-${statusColor}-400`

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
  );
  /*
  return (
    <div className={backClasses}>
      <div className='m-auto'>
        <div className={`rounded-2xl border-4 shadow-lg p-6 ${borderClass}`}>
          <div className='font-semibold text-4xl'>{rig.name}</div>
          <div className='font-normal'>{rig.status}</div>
        </div>
        
        <div className='p-4'></div>
        <div>text</div>
      </div>
      
    </div>
  );
  */
}

export default App;
