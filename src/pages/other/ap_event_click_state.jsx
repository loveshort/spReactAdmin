class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { count: 0 }
    }
    // 点击事件处理函数
    handleClick = () => {
        this.setState({ count: this.state.count + 1 })
    }

    render() {
        return (
            <div>
                <p>点击次数：{this.state.count}</p>
                <button onClick={this.handleClick}>点击我</button>
            </div>
        );
    }
}