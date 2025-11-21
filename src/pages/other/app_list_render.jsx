class MyComponent extends React.Component {
    render() {
        const items = ["item1", "item2", "item3"];
        return (
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        )
    }
}