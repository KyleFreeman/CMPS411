import React from 'react'
import UploadBtn from '../Buttons/UploadBtn'
import './Body.css'

const Body = () => {
    return (
        <div id="bodyDiv" className="Body">
            <h3 className="uploadLabel">Upload Micro-Organism</h3>
            <UploadBtn />
            <br/>
        </div>
    )
}

export default Body