import './About.css';
import TextBox from '../../Components/TextBox/TextBox';
import Beachy from '../../images/beachy.jpg'
import Pic from '../../images/IMG_0578.jpg';

function About() {

  const aboutUsBox = <div>
      About Us!
    <br/>
    </div>


  const creatorsBox = <p>
       <p id="creators">
        Creators:(Left to Right)
        <br/>
              Hayden Israel, 
              Allen Mire, 
              Ben Cassel, 
              Max Cole, 
              Kyle Freeman, and 
              Madison LeBlanc
        <br/>
        <br/>
        Undergraduate students at Southeastern Louisiana University
       </p>
      </p>;
  const clientBox = <p id="creators">
      Client:
      <br/>
      Dr. Christopher Beachy
      <br/>
      Department Head of Biology at Southeastern Louisiana University
     </p>;


  return (
    <div className="Main">
      <div className="AboutPage">
          <TextBox className="about" text={aboutUsBox}/>
        <div className="aboutUs">
          <img src={Pic} alt="Pic" id="Pic" />
          <TextBox className="create" text={creatorsBox}/>
        </div>
        <div className="aboutClient">
          <img src={Beachy} alt="Dr.Beachy" id="Beachy" />
          <TextBox className="client" text={clientBox} /> 
        </div>
      </div>
    </div>
  );
}

export default About;
