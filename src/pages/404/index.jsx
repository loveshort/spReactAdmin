import { Button, Col, Layout, Result, Row, Space, Typography, theme } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'

export default function NotFound() {
  const { token } = theme.useToken()
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <Layout style={{ minHeight: '100vh', background: token.colorBgLayout }}>
      <Layout.Content style={{ padding: 24 }}>
        <Row justify="center" align="middle" style={{ minHeight: 'calc(100vh - 48px)' }}>
          <Col xs={24} md={18} lg={12}>
            <Result
              status="404"
              title="页面不存在"
              subTitle={
                <Typography.Text type="secondary">
                  未找到路径：{location.pathname}
                </Typography.Text>
              }
              extra={
                <Space>
                  <Button onClick={() => navigate(-1)}>返回上一页</Button>
                  <Button type="primary" onClick={() => navigate('/admin/dashboard')}>
                    去仪表盘
                  </Button>
                  <Button type="link" onClick={() => navigate('/login')}>
                    去登录
                  </Button>
                </Space>
              }
            />
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  )
}
