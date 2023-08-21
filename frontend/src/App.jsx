import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div style={{border: "2px solid blueviolet"}}>
    <h2>OpenTelemetry in React Js</h2>
   </div>
  )
}

export default App
