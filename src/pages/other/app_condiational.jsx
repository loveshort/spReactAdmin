var i = 1;

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <div>
        {i === 1 ? <h1>Hello React</h1> : <h1>Hello Vue</h1>}
    </div>
)