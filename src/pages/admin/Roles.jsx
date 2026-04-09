import { Button, Form, Input, Modal, Popconfirm, Space, Table, message } from 'antd'
import { useMemo, useState } from 'react'

export default function Roles() {
  const [form] = Form.useForm()
  const [roles, setRoles] = useState(() => [
    { id: 1, name: '管理员', desc: '拥有所有权限' },
    { id: 2, name: '编辑', desc: '可编辑内容' },
    { id: 3, name: '访客', desc: '只读权限' },
  ])
  const [keyword, setKeyword] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [editing, setEditing] = useState(null)

  const dataSource = useMemo(() => {
    const k = keyword.trim().toLowerCase()
    const filtered = k
      ? roles.filter((r) => r.name.toLowerCase().includes(k) || r.desc.toLowerCase().includes(k))
      : roles
    return filtered.map((item) => ({ key: item.id, ...item }))
  }, [keyword, roles])

  const columns = useMemo(
    () => [
      { title: 'ID', dataIndex: 'id', width: 80 },
      { title: '角色名', dataIndex: 'name' },
      { title: '描述', dataIndex: 'desc' },
      {
        title: '操作',
        dataIndex: 'actions',
        render: (_, record) => (
          <Space>
            <Button
              size="small"
              onClick={() => {
                setEditing(record)
                form.setFieldsValue({ name: record.name, desc: record.desc })
                setModalOpen(true)
              }}
            >
              编辑
            </Button>
            <Popconfirm
              title="确认删除该角色？"
              okText="删除"
              cancelText="取消"
              onConfirm={() => {
                setRoles((prev) => prev.filter((r) => r.id !== record.id))
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
    setModalOpen(true)
  }

  const onSubmit = async () => {
    try {
      const values = await form.validateFields()
      setSubmitting(true)
      await new Promise((r) => setTimeout(r, 200))
      if (editing) {
        setRoles((prev) =>
          prev.map((r) => (r.id === editing.id ? { ...r, ...values } : r)),
        )
        message.success('已更新')
      } else {
        const nextId = roles.length ? Math.max(...roles.map((r) => r.id)) + 1 : 1
        setRoles((prev) => [{ id: nextId, ...values }, ...prev])
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
          placeholder="搜索角色/描述"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{ width: 240 }}
          allowClear
        />
        <Button onClick={() => setKeyword('')}>重置</Button>
        <Button type="primary" onClick={openCreate}>
          新增角色
        </Button>
      </Space>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: 10, showSizeChanger: false }}
      />

      <Modal
        title={editing ? '编辑角色' : '新增角色'}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={onSubmit}
        confirmLoading={submitting}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="角色名"
            name="name"
            rules={[{ required: true, message: '请输入角色名' }]}
          >
            <Input placeholder="例如：管理员" />
          </Form.Item>
          <Form.Item
            label="描述"
            name="desc"
            rules={[{ required: true, message: '请输入描述' }]}
          >
            <Input placeholder="例如：拥有所有权限" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
