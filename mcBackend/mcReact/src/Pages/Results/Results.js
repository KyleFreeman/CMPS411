import './Results.css';

function Results(props) {
  const { state } = props.location

  return (
    <div className="Main">
      <div className="BodyMain">
        <p>This is the body of {state}.</p>
      </div>

      {/* <Loading/> */}
    </div>
  );
}

export default Results;
