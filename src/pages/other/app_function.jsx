//方式1.函数声明
function Welcome(props) {
    return  <h1>Hello,{props.name}</h1>
}

//方式2:箭头函数
const Welcome = (props) => {
    return <h1>Hello,{props.name}</h1>;
}

//方式3:简化写法
const Welcome = ({ props }) => <h1>Hello, {props.name}!</h1>;



//方式4:类组件
class Welcome extends Component {
    render() {
        return <h1>Hello, {this.props.name}!</h1>;
    }
}
