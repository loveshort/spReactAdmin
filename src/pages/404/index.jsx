import { Button, Result, Space, Typography } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
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
    </div>
  )
}
