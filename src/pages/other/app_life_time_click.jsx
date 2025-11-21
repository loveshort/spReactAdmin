import { Component } from "react";
class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date() };
    }
    //挂载
    componentDidMount() {
        this.timerID = setInterval(() => {
            this.tick();
        }, 1000);
    }

    //卸载
    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    //更新
    tick() {
        this.setState({
            date: new Date()
        })
    }
    render() {
        return (
            <div>
                <h1>欢迎来到React世界</h1>
                <h2>当前时间: {this.state.date.toLocaleTimeString()}</h2>
            </div>
        )
    }
}

const root = ReactDOM.createRoot(
    document.body
);
root.render(<Clock />);