import app_module_css from './app_modul_css.css'

const MyComponent = () => {
    return (
        <div className={app_module_css.container}>
            <h2 className={app_module_css.title}>My Component</h2>
        </div>
    );
}

const root5 = ReactDOM.createRoot(document.getElementById('rootMyComponent'));
root5.render(<MyComponent />);