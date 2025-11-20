
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
        <div className='App-content'>
          <UserProfile />
        </div>
        <div className='App-content'>
          <Welcome name="张三" />
        </div>
        <div className='App-content'>
          <Welcome name="李四" />
        </div>
        <div className='App-content'>
          <Welcome name="王五" />
        </div>
        <div className='App-content'>
          <Welcome name="赵六" />
        </div>
        <div className='App-content'>
          <Welcome name="田七" />
        </div>
      </div>
    </>
  )
}

export default App
