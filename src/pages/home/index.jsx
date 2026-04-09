import { useState } from 'react'

// 首页：示例页面，包含一个简单计数器
export default function Home() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>Home</h1>
      <button type="button" onClick={() => setCount((c) => c + 1)}>
        count: {count}
      </button>
    </div>
  )
}
