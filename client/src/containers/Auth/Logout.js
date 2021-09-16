import React from "react";
import axios from "axios";

const Logout = (props) => {
    axios.get("/api/logout").then((res) => {
        setTimeout(() => {
            props.history.push("/");
        }, 1000);
    });

    return (
        <div>
            <h1>Logging out</h1>
        </div>
    );
};

export default Logout;
