import './App.css';
import Body from '../../Components/Body/Body';
import Loading from '../../Components/Loading/Loading';

function App() {
  return (
    <div className="Main">
      <div id="uploadMain" className="uploadMain">
        <Body/>
        <Loading />
      </div>
    </div>
  );
}

export default App;
