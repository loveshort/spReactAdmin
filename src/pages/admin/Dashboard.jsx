import { Card, Col, Row, Statistic } from 'antd'

export default function Dashboard() {
  return (
    <Row gutter={16}>
      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic title="用户数" value={128} />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic title="角色数" value={6} />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic title="菜单数" value={24} />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic title="今日访问" value={903} />
        </Card>
      </Col>
    </Row>
  )
}
