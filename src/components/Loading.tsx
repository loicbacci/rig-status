import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as creators from '../reducers/actionCreators'

const Loading = () => {
  const dispatch = useDispatch()
  const error = useSelector<State, State['error']>(state => state.error)

  const backColor = error ? 'bg-red-300' : 'bg-yellow-300'
  const borderColor = error ? 'border-red-600' : 'border-yellow-600'
  const buttonColor = error ? 'bg-red-600' : 'bg-yellow-600'
  const buttonHoverColor = error ? 'bg-red-700' : 'bg-yellow-700'


  const submit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const target = event.target as typeof event.target & {
      accessKey: { value: string }
    }
    const key: string = target.accessKey.value
    dispatch(creators.setKey(key))
    dispatch(creators.fetchData(dispatch))
  }

  const inputClasses = `shadow appearance-none border ${borderColor} rounded 
                        w-full py-2 px-3 mr-4 leading-tight focus:outline-none
                        focus:shadow-outline`
  
  const buttonClasses = `${buttonColor} hover:${buttonHoverColor} text-white
                         font-bold py-2 px-4 rounded`

  return (
    <div className={`flex flex-col h-screen text-center ${backColor}`}>
      <form className="m-auto" onSubmit={submit}>
        <label className="block text-3xl font-semibold mb-4" htmlFor="password">
          {!error ? '' : 
            <div className="mb-4 text-4xl font-bold">
              Wrong key entered!
            </div>
          }
          Enter API key
        </label>

        <div className="flex flex-row">
          <input
            name="accessKey"
            className={inputClasses}
            id="password"
            type="password"
            placeholder="******************"
          />
          <button
            type="submit"
            className={buttonClasses}
          >
            Done
          </button>
        </div>
      </form>
    </div>
  )
}


export default Loading
