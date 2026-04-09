// 路由定义：统一维护页面路由、登录跳转与后台受保护路由
import { createBrowserRouter, redirect } from 'react-router-dom'
import { lazy } from 'react'
import App from '../App.jsx'
import RequireAuth from '../components/RequireAuth.jsx'
import AdminLayout from '../layout/AdminLayout.jsx'

// 页面组件统一用 lazy 懒加载；Suspense 的 fallback 由 App 统一提供

// 登录页：不需要登录即可访问
const Login = lazy(() => import('../pages/login'))

// 后台路由：需要登录才能访问
const Dashboard = lazy(() => import('../pages/admin/Dashboard.jsx'))
// 用户管理：需要登录才能访问
const Users = lazy(() => import('../pages/admin/Users.jsx'))
// 角色管理：需要登录才能访问
const Roles = lazy(() => import('../pages/admin/Roles.jsx'))
// 菜单管理：需要登录才能访问
const Menus = lazy(() => import('../pages/admin/Menus.jsx'))
// 404 页面：未匹配到任何路径时进入
const NotFound = lazy(() => import('../pages/404'))

const router = createBrowserRouter([
  {
    path: '/',
    // 根路由只负责承载 Outlet（App 内部做 Suspense 兜底）
    Component: App,
    children: [
      {
        index: true,
        // 默认入口：根据 token 判断去登录页还是后台首页
        loader: () => {
          const token =
            typeof localStorage !== 'undefined' ? localStorage.getItem('token') : ''
          return redirect(token ? '/admin/dashboard' : '/login')
        },
      },
      { path: 'login', Component: Login },
      {
        path: 'admin',
        // 后台路由入口：RequireAuth 会在未登录时重定向到 /login
        Component: RequireAuth,
        children: [
          {
            // 后台布局：侧边栏/顶部/内容区，内部通过 Outlet 渲染具体页面
            Component: AdminLayout,
            children: [
              { path: 'dashboard', Component: Dashboard },
              { path: 'users', Component: Users },
              { path: 'roles', Component: Roles },
              { path: 'menus', Component: Menus },
              // /admin 访问时默认重定向到仪表盘
              { index: true, loader: () => redirect('/admin/dashboard') },
            ],
          },
        ],
      },
      // 兜底路由：未匹配到任何路径时进入 404
      { path: '*', Component: NotFound },
    ],
  },
])

export default router
