import React, { Component } from 'react'

class Counter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 0
        }
        increment = () => {
            this.setState({
                count: this.state.count + 1
            })
        }
    }

    render() {
        return (
            <div>
                <h1>当前计数: {this.state.count}</h1>
                <button onClick={this.increment}>增加</button>
            </div>
        );
    }
}

export default Counter;