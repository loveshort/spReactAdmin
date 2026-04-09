import { Button, Form, Input, Modal, Popconfirm, Select, Space, Switch, Table, Tag, message } from 'antd'
import { useMemo, useState } from 'react'

const roleOptions = [
  { label: '管理员', value: '管理员' },
  { label: '编辑', value: '编辑' },
  { label: '访客', value: '访客' },
]

const statusOptions = [
  { label: '启用', value: 'enabled' },
  { label: '禁用', value: 'disabled' },
]

export default function Users() {
  const [form] = Form.useForm()
  const [users, setUsers] = useState(() => [
    { id: 1, username: 'admin', role: '管理员', status: true },
    { id: 2, username: 'editor', role: '编辑', status: true },
    { id: 3, username: 'guest', role: '访客', status: false },
  ])
  const [keyword, setKeyword] = useState('')
  const [role, setRole] = useState()
  const [status, setStatus] = useState()
  const [modalOpen, setModalOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [editing, setEditing] = useState(null)

  const dataSource = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase()
    const filtered = users.filter((u) => {
      const matchesKeyword = normalizedKeyword
        ? u.username.toLowerCase().includes(normalizedKeyword)
        : true
      const matchesRole = role ? u.role === role : true
      const matchesStatus =
        status === 'enabled' ? u.status === true : status === 'disabled' ? u.status === false : true
      return matchesKeyword && matchesRole && matchesStatus
    })
    return filtered.map((item) => ({ key: item.id, ...item }))
  }, [keyword, role, status, users])

  const columns = useMemo(
    () => [
      { title: 'ID', dataIndex: 'id', width: 80 },
      { title: '用户名', dataIndex: 'username' },
      {
        title: '角色',
        dataIndex: 'role',
        render: (v) => <Tag color="blue">{v}</Tag>,
      },
      { title: '状态', dataIndex: 'status', render: (v) => (v ? '启用' : '禁用') },
      {
        title: '操作',
        dataIndex: 'actions',
        render: (_, record) => (
          <Space>
            <Button
              size="small"
              onClick={() => {
                setEditing(record)
                form.setFieldsValue({
                  username: record.username,
                  role: record.role,
                  status: record.status,
                })
                setModalOpen(true)
              }}
            >
              编辑
            </Button>
            <Popconfirm
              title="确认删除该用户？"
              okText="删除"
              cancelText="取消"
              onConfirm={() => {
                setUsers((prev) => prev.filter((u) => u.id !== record.id))
                message.success('已删除')
              }}
            >
              <Button size="small" danger>
                删除
              </Button>
            </Popconfirm>
          </Space>
        ),
      },
    ],
    [form],
  )

  const openCreate = () => {
    setEditing(null)
    form.resetFields()
    form.setFieldsValue({ status: true, role: '访客' })
    setModalOpen(true)
  }

  const onSubmit = async () => {
    try {
      const values = await form.validateFields()
      setSubmitting(true)
      await new Promise((r) => setTimeout(r, 200))
      if (editing) {
        setUsers((prev) =>
          prev.map((u) => (u.id === editing.id ? { ...u, ...values } : u)),
        )
        message.success('已更新')
      } else {
        const nextId = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1
        setUsers((prev) => [{ id: nextId, ...values }, ...prev])
        message.success('已新增')
      }
      setModalOpen(false)
    } catch (e) {
      if (e?.errorFields) return
      message.error(e?.message || '操作失败')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <Space style={{ marginBottom: 12 }}>
        <Input
          placeholder="搜索用户名"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{ width: 200 }}
          allowClear
        />
        <Select
          placeholder="角色"
          value={role}
          onChange={setRole}
          options={roleOptions}
          style={{ width: 140 }}
          allowClear
        />
        <Select
          placeholder="状态"
          value={status}
          onChange={setStatus}
          options={statusOptions}
          style={{ width: 140 }}
          allowClear
        />
        <Button
          onClick={() => {
            setKeyword('')
            setRole()
            setStatus()
          }}
        >
          重置
        </Button>
        <Button type="primary" onClick={openCreate}>
          新增用户
        </Button>
      </Space>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: 10, showSizeChanger: false }}
      />

      <Modal
        title={editing ? '编辑用户' : '新增用户'}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={onSubmit}
        confirmLoading={submitting}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ status: true, role: '访客' }}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input placeholder="例如：admin" />
          </Form.Item>
          <Form.Item
            label="角色"
            name="role"
            rules={[{ required: true, message: '请选择角色' }]}
          >
            <Select options={roleOptions} />
          </Form.Item>
          <Form.Item label="状态" name="status" valuePropName="checked">
            <Switch checkedChildren="启用" unCheckedChildren="禁用" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
