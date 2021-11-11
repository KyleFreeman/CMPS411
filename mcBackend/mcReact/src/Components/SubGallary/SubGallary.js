import React from 'react'
import './SubGallary.css'
import image1 from "../../images/EMDS5-g05-01.png";
import image2 from "../../images/EMDS5-g05-02.png";

const SubGallary = (props) => {
    return (
        <div className={props.className}>
            <h2 id="GalText">Phylum {props.text}:</h2>
            <img src={image1} id="image1" alt="image1"></img>
            <img src={image2} id="image2" alt="image2"></img>
        </div>
    )
}

export default SubGallary