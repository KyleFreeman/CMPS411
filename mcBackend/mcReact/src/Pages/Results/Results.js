import './Results.css';
import { useState, useEffect } from 'react';

function Results(props) {
  const { state } = props.location
  const [file, setFile] = useState(null);

  const splitName = state.split(/(\s+)/);

  const image = splitName[0]
  const classification = splitName[2]
  const url = "http://localhost:3001/download/" + String(image);
  var imageURL;
  var imageFile;


    fetch(url,
    {
      method: "GET",
      responseType: 'blob'
    })
    .then((res) => res.blob())
    .then((data) => {
      imageURL = URL.createObjectURL(data);
      imageFile = new Image();
      imageFile.src = imageURL;
      let parent = document.getElementById("BodyMain");
      parent.appendChild(imageFile);
      console.log(imageURL);
    });

    return (
      <div className="Main">
        <div id="BodyMain" className="BodyMain">
          
        </div>
  
        {/* <Loading/> */}
      </div>
    );
}

export default Results;


