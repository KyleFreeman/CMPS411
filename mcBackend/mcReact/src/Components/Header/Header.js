import React from 'react'
import "./Header.css";
import Lion from "./Lion";

const Header = () => {
    return (
        <div className="header">
            <div className="titles">
                <h1 className="name">Micro-Organism</h1>
                <h1 className="name2">Classifier</h1>
            </div>
            <Lion/>
        </div>
    )
}

export default Header