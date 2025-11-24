import React from 'react';

import { createBrowserRouter } from 'react-router-dom'

const Login = React.lazy(() => import('../pages/login/index'))
const Home = React.lazy(() => import('../pages/home/index'))
const User = React.lazy(() => import('../pages/user/index'))
const NotFound = React.lazy(() => import('../pages/404/index'))

//创建路由
const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/home",
        element: <Home />,
    },
    {
        path: "/user",
        element: <User />,
    },
    {
        path: "*",
        element: <NotFound />,
    },
])

export default router

