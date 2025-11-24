//使用if 语句
class MyComponent extends React.Component {
    render() {
        const isLoggedIn = this.props.isLoggedIn;
        let content;
        if (isLoggedIn) {
            content = <h1>Welcome back!</h1>
        } else {
            content = <h1>Please sign up!</h1>
        }
        return (
            <div>
                {content}
            </div>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<MyComponent isLoggedIn={true} />)


//使用三元运算符
const MyComponent = (props) => {
    const isLoggedIn = props.isLoggedIn;
    return (
        <div>
            {isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please sign up!</h1>}
        </div>
    );
}

const root2 = ReactDOM.createRoot(document.getElementById('root2'))
root2.render(<MyComponent isLoggedIn={false} />)


//使用逻辑与运算法
const MyComponent = (props) => {
    const isLoggedIn = props.isLoggedIn;
    return (
        <div>
            {isLoggedIn && <h1>Welcome back!</h1>}
            {!isLoggedIn && <h1>Please sign up!</h1>}
        </div>
    );
}

const root3 = ReactDOM.createRoot(document.getElementById('root3'))
root3.render(<MyComponent isLoggedIn={true} />)


//使用switch语句
class MyComponent extends React.Component {
    render() {
        const userRole = this.props.userRole;
        let content;
        switch (userRole) {
            case 'admin':
                content = <h1>Welcome admin!</h1>
                break;
            case 'user':
                content = <h1>Welcome user!</h1>
                break;
            case 'guest':
                content = <h1>Welcome guest!</h1>
                break;
            default:
                content = <h1>who are you?</h1>;
        }
        return (
            <div>
                {content}
            </div>
        );
    }
}