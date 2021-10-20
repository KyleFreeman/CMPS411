import React from 'react'
import "./Lion.css";
import lion from "../../images/lion.png";

const Lion = () => {
    return (
        <div className="lionDiv">
            <img className="lion" alt="lion" src={lion}></img>
        </div>
    )
}

export default Lion