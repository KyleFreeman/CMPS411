import './Results.css';
import TextBox from '../../Components/TextBox/TextBox';
import Kevin from '../../images/EMDS5-g16-01.png';

function Results(props) {
  const { state } = props.location
  const name = <div>
Insert Text Here
  </div>;
 
  const displayphoto =  <div>
     
     
      <img src={Kevin} alt="cur" class="center" ></img>
      
    </div>;

  return (
    <div className="Main">
      <div className="HomePage">
        <TextBox className="photo" text={displayphoto}/>
        <TextBox className="name" text={name} /> 
      </div>
    </div>
  );
}

export default Results;
