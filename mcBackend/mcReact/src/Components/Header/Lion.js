import React from 'react'
import "./Lion.css";
import lion from "../../images/lion.png";
import alion from "../../images/Not_Tardi.gif";

const Lion = () => {

    const animate = () => {
        let stdLion = document.getElementById("lion");
        let aniLion = document.getElementById("anilion");

        stdLion.style.opacity = 0;
        aniLion.style.visibility = "visible";
    }

    const unanimate = () => {
        let stdLion = document.getElementById("lion");
        let aniLion = document.getElementById("anilion");

        stdLion.style.opacity = 1;
        aniLion.style.visibility = "hidden";
    }

    return (
        <div className="lionDiv">
            <img className="lion" id="lion" onMouseOver={animate} onMouseOut={unanimate} alt="lion" src={lion}></img>
            <img className="anilion" id="anilion" alt="anilion" src={alion}></img>
        </div>
    )
}

export default Lion