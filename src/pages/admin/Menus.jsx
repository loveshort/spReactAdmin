import { Button, Form, Input, Modal, Popconfirm, Space, Table, message } from 'antd'
import { useMemo, useState } from 'react'

export default function Menus() {
  const [form] = Form.useForm()
  const [menus, setMenus] = useState(() => [
    { id: 1, name: '仪表盘', path: '/admin/dashboard' },
    { id: 2, name: '用户管理', path: '/admin/users' },
    { id: 3, name: '角色管理', path: '/admin/roles' },
    { id: 4, name: '菜单管理', path: '/admin/menus' },
  ])
  const [keyword, setKeyword] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [editing, setEditing] = useState(null)

  const dataSource = useMemo(() => {
    const k = keyword.trim().toLowerCase()
    const filtered = k
      ? menus.filter((m) => m.name.toLowerCase().includes(k) || m.path.toLowerCase().includes(k))
      : menus
    return filtered.map((item) => ({ key: item.id, ...item }))
  }, [keyword, menus])

  const columns = useMemo(
    () => [
      { title: 'ID', dataIndex: 'id', width: 80 },
      { title: '名称', dataIndex: 'name' },
      { title: '路径', dataIndex: 'path' },
      {
        title: '操作',
        dataIndex: 'actions',
        render: (_, record) => (
          <Space>
            <Button
              size="small"
              onClick={() => {
                setEditing(record)
                form.setFieldsValue({ name: record.name, path: record.path })
                setModalOpen(true)
              }}
            >
              编辑
            </Button>
            <Popconfirm
              title="确认删除该菜单？"
              okText="删除"
              cancelText="取消"
              onConfirm={() => {
                setMenus((prev) => prev.filter((m) => m.id !== record.id))
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
        setMenus((prev) =>
          prev.map((m) => (m.id === editing.id ? { ...m, ...values } : m)),
        )
        message.success('已更新')
      } else {
        const nextId = menus.length ? Math.max(...menus.map((m) => m.id)) + 1 : 1
        setMenus((prev) => [{ id: nextId, ...values }, ...prev])
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
          placeholder="搜索名称/路径"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{ width: 240 }}
          allowClear
        />
        <Button onClick={() => setKeyword('')}>重置</Button>
        <Button type="primary" onClick={openCreate}>
          新增菜单
        </Button>
      </Space>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: 10, showSizeChanger: false }}
      />

      <Modal
        title={editing ? '编辑菜单' : '新增菜单'}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={onSubmit}
        confirmLoading={submitting}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="名称"
            name="name"
            rules={[{ required: true, message: '请输入名称' }]}
          >
            <Input placeholder="例如：用户管理" />
          </Form.Item>
          <Form.Item
            label="路径"
            name="path"
            rules={[
              { required: true, message: '请输入路径' },
              { pattern: /^\/.*/, message: '路径需要以 / 开头' },
            ]}
          >
            <Input placeholder="/admin/users" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
