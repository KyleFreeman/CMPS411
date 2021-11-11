import React from 'react'
import "./Header.css";
import Lion from "./Lion";

const Header = () => {
    return (
        <div className="header">
            <h1 className="name">Micro-Organism Classifier</h1>
            <Lion/>
        </div>
    )
}

export default Header