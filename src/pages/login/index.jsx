import { Button, Card, Col, Form, Input, Layout, Row, Typography, message, theme } from 'antd'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/auth'

export default function Login() {
  const { token } = theme.useToken()
  const location = useLocation()
  const navigate = useNavigate()
  const login = useAuthStore((s) => s.login)
  const isAuthed = useAuthStore((s) => s.isAuthed)

  // 登录后跳转目标：
  // - 如果从受保护页面被拦截过来，优先回到原页面（state.from）
  // - 否则进入后台默认首页
  const redirectTo = location.state?.from || '/admin/dashboard'

  useEffect(() => {
    // 已登录时避免重复停留在登录页
    if (isAuthed()) {
      navigate(redirectTo, { replace: true })
    }
  }, [isAuthed, navigate, redirectTo])

  // 提交表单后执行登录，成功后跳转
  const onFinish = async (values) => {
    try {
      await login(values)
      message.success('登录成功')
      navigate(redirectTo, { replace: true })
    } catch (e) {
      message.error(e?.message || '登录失败')
    }
  }

  return (
    <Layout style={{ minHeight: '100vh', background: token.colorBgLayout }}>
      <Layout.Content style={{ padding: 24 }}>
        <Row justify="center" align="middle" style={{ minHeight: 'calc(100vh - 48px)' }}>
          <Col xs={24} sm={18} md={12} lg={8} xl={6}>
            <Card>
              <Typography.Title level={3} style={{ marginTop: 0 }}>
                后台登录
              </Typography.Title>
              <Form layout="vertical" onFinish={onFinish} autoComplete="off">
                <Form.Item
                  label="账号"
                  name="username"
                  rules={[{ required: true, message: '请输入账号' }]}
                >
                  <Input placeholder="admin" />
                </Form.Item>
                <Form.Item
                  label="密码"
                  name="password"
                  rules={[{ required: true, message: '请输入密码' }]}
                >
                  <Input.Password placeholder="123456" />
                </Form.Item>
                <Button type="primary" htmlType="submit" block>
                  登录
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  )
}
