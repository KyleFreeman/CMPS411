import React from 'react'
import './TextBox.css'

const TextBox = (props) => {
    return (
        <div className={props.className}>
            {props.text}
        </div>
    )
}

export default TextBox