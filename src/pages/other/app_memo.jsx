import { useCallback, useMemo } from "react";

// 记忆组件
const MyComponent = React.memo((props) => {
    console.log('渲染组件');
    return (
        <div>
            {props.text}
        </div>
    );
});

const AppMemo = () => {
    const [count, setCount] = React.useState(0);
    const [text, setText] = React.useState('Hello, World!');
    return (
        <div>
            <button onClick={() => setCount(count + 1)}>增加</button>
            <MyComponent text={text} />
        </div>
    );
}

const rootMemo = ReactDOM.createRoot(document.getElementById('rootMemo'));
rootMemo.render(<AppMemo />);


//使用自定义比较函数
const MyComponent2 = React.memo((props) => {
    console.log('渲染组件');
    return (
        <div>
            {props.text}
        </div>
    );
}, (prevProps, nextProps) => {
    return prevProps.text === nextProps.text;
});

const AppMemo2 = () => {
    const [count, setCount] = React.useState(0);
    const [text, setText] = React.useState('Hello, World!');
    return (
        <div>
            <button onClick={() => setCount(count + 1)}>增加</button>
            <MyComponent2 text={text} />
        </div>
    );
}

const rootMemo2 = ReactDOM.createRoot(document.getElementById('rootMemo2'));
rootMemo2.render(<AppMemo2 />);


// 记忆组件的注意事项
// 1. 记忆组件只在 props 发生变化时才会重新渲染，而不是在 state 发生变化时。
// 2. 记忆组件只能用于函数组件，不能用于类组件。
// 3. 记忆组件的比较函数只能比较 props，不能比较 state。

//与UseMemo 和 useCallback的区别
const ChildComponent = React.memo((onClick, count) => {
    console.log('渲染子组件');

    return (<
        button onClick={() => props.handleClick()}>点击我</button>
    );
});

const AppMemo3 = () => {
    const [count, setCount] = React.useState(0);
    const increment = useCallback(() => {
        setCount(count + 1);
    }, [count]);

    const doubledCount = useMemo(() => {
        return count * 2;
    }, [count]);

    return (
        <div>
            <p>当前计数: {count}</p>
            <p>当前计数的两倍: {doubledCount}</p>
            <ChildComponent onClick={increment} count={count} />
        </div>
    );
};

const rootMemo3 = ReactDOM.createRoot(document.getElementById('rootMemo3'));
rootMemo3.render(<AppMemo3 />);