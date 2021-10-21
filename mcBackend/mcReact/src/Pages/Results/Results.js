import './Results.css';
import TextBox from '../../Components/TextBox/TextBox';
import axios from 'axios';
import { useEffect } from 'react';


const Results = (props) => {
  const { state } = props.location
  const splitName = state.split(/(\s+)/);

  const image = splitName[0]
  const classification = splitName[2]
  const url = "http://localhost:3001/download/" + String(image);

  const grabImage = (url) => {
    var imageURL;
    var imageFile;

    axios({
      method: 'get',
      url: url,
      responseType: 'blob'
    })
    .then(function (response) {
      imageURL = URL.createObjectURL(response.data);
      imageFile = new Image();
      imageFile.src = imageURL;
      imageFile.id = "Image";
      let parent = document.getElementById("ResultsMain");
      parent.appendChild(imageFile);
    });
  }

  useEffect(() => {
    grabImage(url);
  },[]);

  return (
    <div className="Main">
      <div  id="ResultsMain" className="ResultsMain" >
        <TextBox className="classi" text={classification} />

      </div>

    </div>
  );
}

export default Results;


