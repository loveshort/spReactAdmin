import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Home extends PureComponent {
    render() {
        return (
            <div>
                <h1>Home</h1>
            </div>
        )
    }
}

// 计数器
function Counter(params) {
    const [count, setCount] = useState(0)
    return <button onClick={() => setCount(count + 1)}>{count}</button>
}