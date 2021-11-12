import React from 'react'
import './Loading.css'
import loading from '../../images/loading.gif'

const Loading = () => {

    return (
        <div id="loadingDiv" className="loadingDiv">
            <img src={loading} alt="Model Training..." id="loadingGif" className="loadingGif" />
        </div>
    )
}

export default Loading