import './Results.css';
import TextBox from '../../Components/TextBox/TextBox';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';


const Results = (props) => {
  const { stateClass } = props.location
  const [ state, setState ] = useState(null);
  const [ galImage, setGalImage ] = useState(null);
  const [ classification, setClassification ] = useState("");

  useEffect(() => {
    const splitName = stateClass.split(/(\s+)/);
    const image = splitName[0]
    setClassification(splitName[2]);
    const url = "http://localhost:3001/result/" + String(image);
    
    const grabImage = async (url) => {
      var imageURL;

      const response = await axios({
          method: 'get',
          url: url,
          responseType: 'blob'
        });

      if(response.status === 200){
        imageURL = URL.createObjectURL(response.data);
        setState(imageURL);
      }
    }

    const downloadImage = (subGal) => {
      const url = "http://localhost:3001/subGallery/" + String(subGal);
  
      axios({
        method: 'get',
        url: url,
      }).then((response) => {
        if(response.status === 200){
          if(response.data[0] === "none"){
            const noReturn = [<h2 id="noValues">No Values Found!</h2>]
            setGalImage(noReturn);
          }
          else {
            var listOfImages = new Array();
            listOfImages = response.data;
            for(var i = 0; i < listOfImages.length; i++) {
              listOfImages[i] = "http://localhost:3001/" + listOfImages[i];
            }
    
            const listItems = listOfImages.map((imageFile) =>
              <img className="image1" src={imageFile} alt={classification}></img>
            );

            setGalImage(listItems);
          }
        }
      });
    }

    grabImage(url)
    downloadImage(splitName[2]);

  },[]);

  return (
    <div className="ResultsBody">
      <div id="ResultsMain" className="ResultsMain" >
        <TextBox className="classi" text={`Predicted Result: ${classification}`} />
        <img src={state} id="Image"></img>
      </div>
      <div className="SubGallery">
        <h2 id="GalText">Images of {classification}:</h2>
        {galImage}
      </div>
    </div>
  );
}

export default Results;


