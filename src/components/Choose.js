import { useState } from 'react';

function Choose({ questions, chooseQuestions, dispatch }) {
  const [numQuestions, setNumQuestions] = useState(15);

  const styleInput = {
    display: 'flex',
    gap: '16px',
    fontSize: '24px',
    position: 'relative',
    width: '20rem',
  };

  const styleScore = {
    position: 'absolute',
    top: '-20px',
    left: '50%',
    transform: 'translateX(-50%)',
  };

  const styleBox = {
    height: '400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // paddingTop: '60px',
  };

  const styleButton = {
    border: 'none',
    padding: '12px 24px',
    borderRadius: '13px',
    marginTop: '20px',
    fontWeight: '600',
  };

  return (
    <div style={styleBox}>
      <h3>Choose an amount of questions!</h3>
      <div style={styleInput}>
        <p>0</p>
        <input
          type="range"
          max={questions.length}
          onChange={e => setNumQuestions(e.target.value)}
        />
        <p>{questions.length}</p>
        <p style={styleScore}>{numQuestions}</p>
      </div>
      <button
        onClick={() => dispatch({ type: 'choose', payload: numQuestions })}
        style={styleButton}
      >
        Accept
      </button>
    </div>
  );
}

export default Choose;
