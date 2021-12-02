import './Home.css';
import TextBox from '../../Components/TextBox/TextBox';

function Home() {

  const announceBox = <div>
      Announcements:
      <br/>
      <li>Scheduled maintainence for 2/2/22.</li>
    </div>;
  const instructBox =  <div>
      Instructions:
      <br/>
      <li>Collect sample of Micoorganism</li>
      <li>Photograph organism through microscope</li>
      <li>Upload your photograph</li>
      <li>Receive the organism classification</li>
    </div>;

  return (
    <div className="Main">
      <div className="HomePage">
        <TextBox className="instruct" text={instructBox}/>
        <TextBox className="announce" text={announceBox} />
      </div>
    </div>
  );
}

export default Home;


