function App() {
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

export default App;