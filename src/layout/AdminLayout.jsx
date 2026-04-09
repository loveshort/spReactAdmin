import { Breadcrumb, Button, Card, Layout, Menu, Space, Typography, theme } from 'antd'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useMemo } from 'react'
import { useAuthStore } from '../store/auth'

const { Header, Sider, Content } = Layout

const menuItems = [
  { key: '/admin/dashboard', label: '仪表盘' },
  { key: '/admin/users', label: '用户管理' },
  { key: '/admin/roles', label: '角色管理' },
  { key: '/admin/menus', label: '菜单管理' },
]

export default function AdminLayout() {
  const { token } = theme.useToken()
  const location = useLocation()
  const navigate = useNavigate()
  const logout = useAuthStore((s) => s.logout)

  const selectedKeys = useMemo(() => {
    const key = menuItems.find((i) => location.pathname.startsWith(i.key))?.key
    return key ? [key] : []
  }, [location.pathname])

  const currentTitle = useMemo(() => {
    const key = selectedKeys[0]
    return menuItems.find((i) => i.key === key)?.label || '后台'
  }, [selectedKeys])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible>
        <Space style={{ height: 48, margin: 16 }}>
          <Typography.Title level={5} style={{ color: '#fff', margin: 0 }}>
            Admin
          </Typography.Title>
        </Space>
        <Menu
          theme="dark"
          mode="inline"
          items={menuItems}
          selectedKeys={selectedKeys}
          onClick={(e) => navigate(e.key)}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            background: token.colorBgContainer,
            paddingInline: 16,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Breadcrumb
            items={[
              { title: '后台' },
              { title: currentTitle },
            ]}
          />
          <Button
            onClick={() => {
              logout()
              navigate('/login', { replace: true })
            }}
          >
            退出登录
          </Button>
        </Header>
        <Content style={{ margin: 16 }}>
          <Card bordered={false} style={{ background: token.colorBgContainer }}>
            <Outlet />
          </Card>
        </Content>
      </Layout>
    </Layout>
  )
}
