// 根布局：承载导航与 <Outlet />，并提供懒加载的统一兜底
import './App.css'
import { Suspense } from 'react'
import { Link, Outlet } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <nav className="App-header">
        <h2>sp_react_admin</h2>
        <div className="App-content">
          <Link to="/">登录</Link>
          {' | '}
          <Link to="/home">首页</Link>
          {' | '}
          <Link to="/user">用户</Link>
        </div>
      </nav>
      <main className="App-content">
        <Suspense fallback={<div>页面加载中...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  )
}

export default App
