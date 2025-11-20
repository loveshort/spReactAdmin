import React, { useState } from 'react'

function App() {
    // 状态变量 count 初始值为 0
    const [count, setCount] = useState(0)
    const handleClick = () => {
        setCount(count + 1)
    }
    return (
        <div className="App">
            <p>点击次数：{count}</p>
            <button onClick={handleClick}>点击我</button>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(<App />)