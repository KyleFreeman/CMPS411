import React from 'react'
import './Button.css'
import { useHistory } from 'react-router-dom'
import loading from '../../images/loading.gif';


const Button = (props) => {
    const history = useHistory();

    const trainModel = () => {
        fetch("http://localhost:3001/train",
        {
            method: "POST"
        })
        .then((res) => {
            window.location.reload();
        })

        let btn = document.getElementById("trainButton");
        btn.style.visibility = "hidden";
        let gif = document.getElementById("loading");
        gif.style.visibility = "visible";

    }

    return (
        
        <div className="buttonDiv">
            <button onClick={trainModel} id="trainButton" className="trainButton" type="submit">{props.type}</button>
            <img src={loading} id="loading" className="loading" />
        </div>
    )
}

export default Button