import './App.css'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <Suspense fallback={<div>页面加载中...</div>}>
      <Outlet />
    </Suspense>
  )
}

export default App
