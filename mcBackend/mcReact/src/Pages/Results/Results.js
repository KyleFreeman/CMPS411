import './Results.css';
import TextBox from '../../Components/TextBox/TextBox';

function Results(props) {
  const { state } = props.location

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
      imageFile.id = "Image";
      let parent = document.getElementById("ResultsMain");
      parent.appendChild(imageFile);
    });

    return (
      <div className="Main">
        <div id="ResultsMain" className="ResultsMain">
          <TextBox className="classi" text={classification} />
        </div>
  
        {/* <Loading/> */}
      </div>
    );
}

export default Results;


