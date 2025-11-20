import { useState } from "react";

// 一个简单的组件
function Welcome({ name }) {
    return <h1>Hello, {name}!</h1>;
}

//组件的复用和组合
function App() {
    return (
        <div>
            <Welcome name="Alice" />
            <Welcome name="Bob" />
            <Welcome name="Charlie" />
        </div>
    );
}

//假设要更新1000个列表项
const items = Array(1000).fill(0).map((_, index) => index);

//传统方式：每次都操作真实DOM(慢)
items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    ul.appendChild(li);
});

//React方式：使用虚拟DOM批量更新(快)
function ItemList() {
    return (
        <ul>
            {items.map(item => (
                <li key={item}>{item}</li>
            ))}
        </ul>
    );
}

//React 会智能地批量更新 DOM


//React 单向数据流
function Parent() {
    const [message, setMessage] = useState("hello")
    return (
        <Child message={message} update={setMessage} />
    );
}

function Child({ message, update }) {
    return (
        <div>
            <p>{message}</p>
            <button onClick={() => update("world")}>Update</button>
        </div>
    );
}