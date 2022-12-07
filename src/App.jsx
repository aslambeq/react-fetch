import { useState } from 'react'
import './App.css'
import CustomNew from './custom-new/CustomNew'
import Custom from './custom/Custom'
import ReactQuery from './react-query/ReactQuery'

function App() {
  const [customNewDisplayed, setCustomNewDisplayed] = useState(true)
  const [customDisplayed, setCustomDisplayed] = useState(false)
  const [reactQueryDisplayed, setReactQueryDisplayed] = useState(false)

  return (
    <div className='App'>
      {customNewDisplayed ? <CustomNew /> : null}
      {customDisplayed ? <Custom /> : null}
      {reactQueryDisplayed ? <ReactQuery /> : null}

      <button onClick={() => setCustomNewDisplayed(prev => !prev)}>toggle custom-new</button>
      <button onClick={() => setCustomDisplayed(prev => !prev)}>toggle custom</button>
      <button onClick={() => setReactQueryDisplayed(prev => !prev)}>toggle react-query</button>
    </div>
  )
}

export default App
