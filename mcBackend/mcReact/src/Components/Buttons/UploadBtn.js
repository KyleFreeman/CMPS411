import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './UploadBtn.css'

const UploadBtn = (props) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const history = useHistory();
    
    const submitForm = () => {
        const data = new FormData();
        data.append('file', selectedFile);

        fetch("http://localhost:3001/upload",
            {
                body: data,
                method: "POST"
            })
        .then((res) => res.text())
        .then((daata) => {
            history.push({
                pathname: "/Results",
                state: daata
            });
        })
    }

    return (
        <div className="uploadBtn">
            <div className="uploadDiv">
                <input type="file" id="myFile" className="upload" name="file" onChange={(e) => setSelectedFile(e.target.files[0])} multiple accept=".jpg,.jpeg,.png"/>
            </div>
           <button className="submitBtn" onClick={submitForm}>Upload</button>
           <p className="classify" id="classify"></p>
        </div>
    )
}

export default UploadBtn