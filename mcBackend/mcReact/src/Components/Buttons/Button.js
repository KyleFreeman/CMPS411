import React from 'react'
import './Button.css'

const Button = (props) => {

    const trainModel = () => {
        fetch("http://localhost:3001/train",
        {
            method: "POST"
        })
        .then((res) => {
            window.location.reload();
        })

        let btn = document.getElementById("bodyDiv");
        btn.style.display = "none";
        let gif = document.getElementById("loadingDiv");
        gif.style.display = "block";

    }

    return (
        
        <div className="buttonDiv">
            <button onClick={trainModel} id="trainButton" className="trainButton" type="submit">{props.type}</button>
        </div>
    )
}

export default Button