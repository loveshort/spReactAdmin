import { Color } from "antd/es/color-picker";

const Header = () => {
    return (
        <div>
            <h1 style={
                { color: 'red', fontSize: '20px' }
            }>Hello, World!</h1>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Header />)


const MyComponent = () => {
    //定义内联样式对象
    const containerStyle = {
        padding: '20px',
        backgroundColor: "#f0f0f0"
    };

    const titleStyle = {
        fontSize: '24px',
        color: '#333'
    };

    return (
        <div style={containerStyle}>
            <h2 style={titleStyle}>My Component</h2>
        </div>
    );
}

const root2 = ReactDOM.createRoot(document.getElementById('rootMyComponent'))
root2.render(<MyComponent />);


//内联样式根据组件的状态动态变化
const MyComponent2 = () => {
    const [isHighlighted, setIsHightlighted] = useState(false);

    const containerStyle = {
        padding: '20px',
        backgroundColor: isHighlighted ? "#ffff99" : "#f0f0f0"
    };

    const titleStyle = {
        fontSize: '24px',
        color: "#333"
    }

    return (
        <div style={containerStyle}>
            <h2 style={titleStyle}>My Component</h2>
            <button onClick={() => setIsHightlighted(!isHighlighted)}>toggle Higtlight</button>
        </div>
    );

}

const root3 = ReactDOM.createRoot(document.getElementById('rootMyComponent2'))
root3.render(<MyComponent2 />);

const Header3 = () => {
    return (
        <>
            <div>
                <h1>Hello Style!</h1>
                <h2>Profile</h2>
                <p>add a little style!.</p>
            </div>
        </>
    );
}

const root4 = ReactDOM.createRoot(document.getElementById('rootHeader3'))
root4.render(<Header3 />);
