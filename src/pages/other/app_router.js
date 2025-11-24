import { BrowserRouter as Router, Routes, Route, Link, Outlet } from "react-router-dom";

import Home from './app_router_dom';
import { About, Contact } from './app_router_dom';

// 设置路由
const App = () => {
    return (
        <Router>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </Router>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);


const Profile = () => {
    return <h2>Profile</h2>;
};



//嵌套路由
const Dashboard = () => {
    return (
        <div>
            <h1>Dashboard</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="profile">Pofile</Link>
                    </li>
                    <li>
                        <Link to="settings">Settings</Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </div>
    )
}

export default Dashboard;

const App2 = () => {
    return (
        <Router>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/dashboard" element={<Dashboard />}>
                    <Route path="profile" element={<Profile />} />
                    <Route path="settings" element={<Settings />} />
                </Route>
            </Routes>
        </Router>
    );
}

const root2 = ReactDOM.createRoot(document.getElementById('root2'));
root2.render(<App2 />);


//动态路由
const User = () => {
    const { userId } = useParams();
    return <h2>User {userId}</h2>;
};


const App3 = () => {
    return (
        <Router>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/user/:userId" element={<User />} />
            </Routes>
        </Router>
    );
}

const root3 = ReactDOM.createRoot(document.getElementById('root3'));
root3.render(<App3 />);


//404页面
const NotFound = () => {
    return <h2>404 Not Found</h2>;
};


const App4 = () => {
    return (
        <Router>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/user/:userId" element={<User />} />
                <Route path="*" element={<Navigate to='/' replace />} />
            </Routes>
        </Router>
    );
}

const root4 = ReactDOM.createRoot(document.getElementById('root4'));
root4.render(<App4 />);
