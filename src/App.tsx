import React, {useState} from 'react';
import './App.less';
import {fetchQuizQuestions} from './API';
//Components
import QuestionCard from './components/QuestionCard'
//Types
import {QuestionsState, Difficulty} from './API'
//Antd
import { Button } from 'antd';
import { Row, Col } from 'antd';


export type AnswerObject = {
  question: string;
  answer :string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);
    
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );
    
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);

  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) setScore((prev) => prev + 1);

      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      }
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    const nextQuestion = number + 1;

    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    }
    else {
      setNumber(nextQuestion);
    }
  }

  return (
    <div className="App">
      <Row justify = 'center'>
        <Col>
        <h1 style = {{marginTop:'35px'}}>GENERAL CULTURE TEST</h1>
        </Col>
      </Row>

      <Row justify = 'center'>
        <Col>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
      <Button  style = {{marginTop: '20px'}} className = 'start' onClick = {startQuiz}>Start</Button> ) : null}
        </Col>
      </Row>

      <Row justify = 'center'>
        <Col>
        {!gameOver ? <p style = {{marginTop: '20px'}} className = 'score'>Score: {score}</p> : null }
        </Col>
      </Row>

      <Row justify = 'center'>
        <Col>
        {loading ? <p>Loading questions...</p> : null }
        </Col>
      </Row>
      
     {!loading && !gameOver && (  
     <QuestionCard
      questionNr = {number + 1}
      totalQuestions = {TOTAL_QUESTIONS}
      question = {questions[number].question}
      answers = {questions[number].answers}
      userAnswer = {userAnswers ? userAnswers[number] : undefined}
      callback = {checkAnswer}
      />
     )}

      <Row justify = 'center'>
        <Col>
        {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
              <Button style = {{marginTop: '30px', borderRadius : '5px'}} className = 'next' onClick = {nextQuestion}>Next question</Button>

      ) : null}
        </Col>
      </Row>
      
    
    </div>
  );
}

export default App;