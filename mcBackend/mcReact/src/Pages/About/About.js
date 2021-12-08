import './About.css';
import TextBox from '../../Components/TextBox/TextBox';
import Beachy from '../../images/beachy.jpg'
import Pic from '../../images/header.png';

function About() {

  const aboutUsBox = <div>
      About Us!

      <ul> Group of CMPS students</ul>
   

    <br/>
    </div>


  const creatorsBox = <p>
       Creators:
              Ben Cassel, 
              Allen Mire, 
              Max Cole, 
              Hayden Israel, 
              Kyle Freeman, and 
              Madison LeBlanc
      </p>;
  const clientBox = <p>
      Client: Dr. Beachy
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
