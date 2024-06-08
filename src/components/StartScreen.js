function StartScreen({ numQuestions, setStart, setChoose }) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <button className="btn btn-ui" onClick={setStart}>
        Let's start
      </button>

      <button className="btn btn-ui btn-choose" onClick={setChoose}>
        Choose amount
      </button>

      {/* <div className="inputBox">
        <div>
          <input type="checkbox" name="easy" checked={true} />
          <label form="easy">Easy</label>
        </div>
        <div>
          <input type="checkbox" name="medium" checked={true} />
          <label for="medium">Medium</label>
        </div>
        <div>
          <input name="hard" type="checkbox" checked={true} />
          <label for="hard">Hard</label>
        </div>
      </div> */}
    </div>
  );
}

export default StartScreen;
