class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isVisible: true }

    }

    // 点击事件处理函数
    toggleVisibility = () => {
        this.setState((prevState) => ({ isVisible: !prevState.isVisible }));
    };

    render() {
        return (
            <div>
                <p>当前状态：{this.state.isVisible ? '可见' : '隐藏'}</p>
                <button onClick={this.toggleVisibility}>切换可见性</button>
            </div>
        );
    }
}