//样式开发--- 

var style = {
    color: 'red',
    fontSize: '20px',
}
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <div style={style}>
        <h1>Hello React</h1>
    </div>
)