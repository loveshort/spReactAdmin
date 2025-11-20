import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { message } from 'antd';

function HelloMessage(props) {
    return <h1>Hello, {props.name}!</h1>;
}

const element = <HelloMessage name="React" />;

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(element)


class HelloMessage extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}!</h1>;
    }

}

HelloMessage.defaultProps = {
    name: 'Stranger'
}

const element2 = <HelloMessage />;
const root2 = ReactDOM.createRoot(document.getElementById('root2'))
root2.render(element2)


//多个props
const UserCard = (props) => {
    return (
        <div>
            <h2>{props.name}</h2>
            <p>Age:{props.age}</p>
            <p>Location:{props.location}</p>
        </div>
    );
}

const user = () => {
    return <UserCard name="张三" age={18} location="中国" />
}

const root3 = ReactDOM.createRoot(document.getElementById('root3'))
root3.render(user())


//propTypes
const Greeting = (props) => {
    return <h1>Hello, {props.name}!</h1>;
}

Greeting.propTypes = {
    name: PropTypes.string.isRequired,
}

const element4 = <Greeting name="React" />;
const root4 = ReactDOM.createRoot(document.getElementById('root4'))
root4.render(element4)


//子传父数据
class ParentComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            message: ""
        };
    }
    handleMessage = (msg) => {
        this.setState({ message: msg })
    }

    render() {
        return (
            <div>
                <h2>Parent Component</h2>
                <p>Received Message: {this.state.message}</p>
                <ChildComponent onMessage={this.handleMessage} />
            </div>
        );
    }
}

const ChildComponent = (props) => {
    const sendMessage = () => {
        props.onMessage("Hello from Child!");
    };

    return (
        <div>
            <h2>Child Component</h2>
            <button onClick={sendMessage}>
                Send Message to Parent
            </button>
        </div>
    );
}

const root5 = ReactDOM.createRoot(document.getElementById('root5'))
root5.render(<ParentComponent />)


