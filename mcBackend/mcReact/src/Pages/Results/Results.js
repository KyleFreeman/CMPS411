import './Results.css';
import TextBox from '../../Components/TextBox/TextBox';
import SubGallary from '../../Components/SubGallary/SubGallary';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';


const Results = (props) => {
  const { stateClass } = props.location
  const [ state, setState ] = useState(null);
  const [ classification, setClassification ] = useState("");
  const history = useHistory();

  useEffect(() => {
    const splitName = stateClass.split(/(\s+)/);

    const image = splitName[0]
    setClassification(splitName[2]);
    const url = "http://localhost:3001/download/" + String(image);
    
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

    grabImage(url);
  },[]);

  return (
    <div className="Main">
      <div id="ResultsMain" className="ResultsMain" >
        <TextBox className="classi" text={`Predicted Result: ${classification}`} />
        <img src={state} id="Image"></img>
      </div>
      <SubGallary className="SubGallary" text={classification}/>
    </div>
  );
}

export default Results;


