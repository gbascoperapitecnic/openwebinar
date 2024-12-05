import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MemeList from './components/MemeList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <main>
        <MemeList/>
     </main>
    </>
  )
}

export default App
