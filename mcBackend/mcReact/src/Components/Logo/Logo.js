import React from 'react'
import "./Logo.css";
import logo from '../../images/slulogo.png'

const Logo = () => {
    return (
        <div className="logoDiv">
            <img src={logo} alt="SLU" className="logo"></img>
        </div>
    )
}

export default Logo