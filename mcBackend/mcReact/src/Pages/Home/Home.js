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
      <li>Collect tiny critter</li>
      <li>Photograph tiny critter</li>
      <li>Upload your photo</li>
      <li>Watch in amazement</li>
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


