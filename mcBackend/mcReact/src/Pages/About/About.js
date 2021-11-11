import './About.css';
import TextBox from '../../Components/TextBox/TextBox';

function About() {

  const aboutUsBox = <div>
      About Us!

    <br/>
    </div>


  const creatorsBox = <div>
       Creators:
       <ul>
              <li>Ben Cassel</li>
              <li>Allen Mire</li>
              <li>Max Cole</li>
              <li>Hayden Israel</li>
              <li>Kyle Freeman</li>
              <li>Madison LeBlanc</li>
        </ul>
      <br/>
      
      </div>;
  const contactBox = <div>
      Contact Info:
      Client@email.com
      Creator@email.com
      <br/>
     </div>;


  return (
    <div className="Main">
      <div className="AboutPage">
      <TextBox className="about" text={aboutUsBox}/>
      <TextBox className="create" text={creatorsBox}/>
        <TextBox className="contact" text={contactBox} /> 
      </div>

     
    </div>
  );
}

export default About;
