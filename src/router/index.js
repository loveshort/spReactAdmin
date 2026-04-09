// 路由定义：统一在这里维护页面路由与入口布局
import { createBrowserRouter } from 'react-router-dom'
import { lazy } from 'react'
import App from '../App.jsx'

const Login = lazy(() => import('../pages/login'))
const Home = lazy(() => import('../pages/home'))
const User = lazy(() => import('../pages/user'))
const NotFound = lazy(() => import('../pages/404'))

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      { index: true, Component: Login },
      { path: 'home', Component: Home },
      { path: 'user', Component: User },
      { path: '*', Component: NotFound },
    ],
  },
])

export default router
