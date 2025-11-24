class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { count: 0 }
    }


    //与挂载阶段相同，用于更新状态
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.reset) {
            return { count: 0 }
        }
        return null;
    }

    //与渲染阶段相同，用于判断是否需要更新组件
    shouldComponentUpdate(nextProps, nextState) {
        return nextState.count !== this.state.count;
    }

    // 在 DOM 更新之前调用，用于捕获一些信息
    getSnapshotBeforeUpdate(prevProps, prevState) {
        return prevState.count;
    }

    //在组件更新调用
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('组件更新完成')
    }

    componentDidMount() {
        console.log('组件挂载完成')
    }

    //在组件卸载调用
    componentWillUnmount() {
        console.log('组件卸载完成')
    }

    render() {
        return (
            <div>{this.state.count}</div>
        );
    }
}


