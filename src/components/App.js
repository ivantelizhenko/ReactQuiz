import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import NextButton from './NextButton';
import Progress from './Progress';
import FinishScreen from './FinishScreen';
import RestartButton from './RestartButton';
import Footer from './Footer';
import Timer from './Timer';
import Choose from './Choose';

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],

  // 'loading', 'error', 'ready', 'active', 'finished'
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  seconds: null,
  chooseQuestions: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'dataRecieved':
      return {
        ...state,
        questions: action.payload,
        status: 'ready',
        chooseQuestions: action.payload,
      };

    case 'dataFailed':
      return { ...state, status: 'error' };

    case 'choose':
      return {
        ...state,
        status: 'ready',
        chooseQuestions: state.questions.slice(0, action.payload),
      };

    case 'setChoose':
      return { ...state, status: 'choose' };

    case 'start':
      return {
        ...state,
        status: 'active',
        seconds: state.questions.length * SECS_PER_QUESTION,
      };

    case 'newAnswer':
      const question = state.questions[state.index];

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };

    case 'nextQuestion':
      return { ...state, index: state.index++, answer: null };

    case 'finish':
      return {
        ...state,
        status: 'finished',
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };

    case 'restart':
      return {
        ...initialState,
        questions: state.questions,
        status: 'ready',
      };

    case 'timer':
      return {
        ...state,
        seconds: state.seconds - 1,
        status: state.seconds === 0 ? 'finished' : state.status,
      };

    default:
      throw new Error('Action unknown');
  }
}

export default function App() {
  const [
    {
      questions,
      status,
      index,
      answer,
      points,
      highscore,
      seconds,
      chooseQuestions,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const maxPossiblePoints = chooseQuestions?.reduce(
    (acc, question) => acc + question.points,
    0
  );

  function handleSetStart() {
    dispatch({ type: 'start' });
  }
  function handleSetChoose() {
    dispatch({ type: 'setChoose' });
  }

  useEffect(function () {
    fetch('http://localhost:8000/questions')
      .then(res => res.json())
      .then(data => dispatch({ type: 'dataRecieved', payload: data }))
      .catch(err => dispatch({ type: 'dataFailed' }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'choose' && (
          <Choose questions={questions} dispatch={dispatch} />
        )}
        {status === 'ready' && (
          <StartScreen
            numQuestions={chooseQuestions.length}
            setStart={handleSetStart}
            setChoose={handleSetChoose}
          />
        )}
        {status === 'active' && (
          <>
            <Progress
              index={index}
              numQuestions={chooseQuestions.length}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} seconds={seconds} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={chooseQuestions.length}
              />
            </Footer>
          </>
        )}

        {status === 'finished' && (
          <>
            <FinishScreen
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              highscore={highscore}
            />
            <RestartButton dispatch={dispatch} />
          </>
        )}
      </Main>
    </div>
  );
}
