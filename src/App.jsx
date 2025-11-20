
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <>
      <div className='App'>
        <div className='App-header'>
          <img src='{logo}' className='App-logo' alt="logo" />
          <h2>
            React + Vite
          </h2>
        </div>
        <div className='App-content'>
          <Counter />
        </div>
      </div>
    </>
  )
}

export default App
