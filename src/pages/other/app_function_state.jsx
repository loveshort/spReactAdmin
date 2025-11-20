function Counter() {
    // 定义状态变量 count 和设置 count 的函数 setCount
    const [count, setCount] = useState(0);
    // 定义增加计数的函数
    const increment = () => {
        setCount(count + 1)
    }
    return (
        <div>
            <h1>当前计数: {count}</h1>
            <button onClick={increment}>增加</button>
        </div>
    )
}

export default Counter;

