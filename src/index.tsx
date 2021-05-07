import React from "react";
import ReactDOM from "react-dom";
import UserList from "./components/UserList";
import './style.css';

const App = () => (
    <UserList />
);

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);