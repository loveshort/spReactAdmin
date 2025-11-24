import React, { useRef } from "react";

class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.myInputRef = React.createRef();
    }
    handleClick() {
        this.myInputRef.current.focus();
    }
    render() {
        return (
            <div>
                <input type="text" ref={this.myInputRef} />
                <input type="button" value="Focus the input" onClick={this.handleClick} />
            </div>
        );
    }
}

//创建refs
class ComponentRefs extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }
    componentDidMount() {
        this.myRef.current.focus();
    }

    render() {
        return (
            <input type="text" ref={this.myRef} />
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<ComponentRefs />)



//回调refs
class ComponentRefsCallback extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = null;
        this.setMyRef = element => {
            this.myRef = element;
        };
    }
    componentDidMount() {
        if (this.myRef) {
            this.myRef.focus();
        }
    }

    render() {
        return (
            <input type="text" ref={this.setMyRef} />
        );
    }
}

const root2 = ReactDOM.createRoot(document.getElementById('root2'))
root2.render(<ComponentRefsCallback />)


//使用Refs 访问子组件实例
class ComponentRefsChild extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }
    focusInput = () => {
        this.myRef.current.focus();
    }
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
    }
    render() {
        return (
            <input type="text" ref={this.myRef} />
        );
    }
}

class ParentComponentRefs extends React.Component {
    constructor(props) {
        super(props);
        this.childRef = React.createRef();
    }

    handleClick = () => {
        this.childRef.current.focusInput();
    }

    render() {
        return (
            <div>
                <ComponentRefsChild ref={this.childRef} />
                <input type="button" value="Focus the child input" onClick={this.handleClick} />
            </div>
        );
    }
}


const MyComponent = () => {
    const inputRef = useRef(null);

    const handleClick = () => {
        inputRef.current.focus();
    }

    return (
        <div>
            <input type="text" ref={inputRef} />
            <button onClick={handleClick}>Focus Click</button>
        </div>
    );
}

const root4 = ReactDOM.createRoot(document.getElementById('root4'))
root4.render(<MyComponent />)