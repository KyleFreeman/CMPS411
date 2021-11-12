import React, { useState } from 'react'
import './DownloadBtn.css'

const DownloadBtn = () => {    
    const pullImage = () => {
        let textArea = document.getElementById("fName");
        let uri = "http://localhost:3001/download/" + String(textArea.value);

        fetch(uri,
            {
                method: "GET"
            })
        .then((res) => {
            console.log(res.status);
        })
    }

    return (
        <div className="DownloadBtn">
            <textarea id="fName" placeholder="Search File"></textarea>
            <button id="dBtn" onClick={pullImage}>Download</button>
        </div>
    )
}

export default DownloadBtn