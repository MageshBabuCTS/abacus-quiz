import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import StartScreen from './components/StartScreen';
import QuizQuestion from './components/QuizQuestion';
import QuizResult from './components/QuizResult';
import { generateQuestions, TOTAL_QUESTIONS, DEFAULT_LEVEL } from './constants';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [questions, setQuestions] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(DEFAULT_LEVEL);
  const navigate = useNavigate();
  const { questionIndex } = useParams() || {};

  useEffect(() => {
    if (questionIndex !== undefined) {
      const index = parseInt(questionIndex, 10);
      if (!isNaN(index) && index >= 0 && index < TOTAL_QUESTIONS) {
        setCurrentQuestion(index);
      }
    }
  }, [questionIndex]);

  const handleStartQuiz = (username, level = DEFAULT_LEVEL) => {
    if (username && username.trim()) {
      setName(username);
      setSelectedLevel(level);
      const newQuestions = generateQuestions(level);
      setQuestions(newQuestions);
      setCurrentQuestion(0);
      setScore(0);
      setUserAnswer('');
      navigate('/quiz/0');
    }
  };

  const handleAnswerSubmit = (answer) => {
    if (answer === '') return;

    const updatedQuestions = [...questions];
    const currentQ = updatedQuestions[currentQuestion];
    const isCorrect = parseInt(answer) === currentQ.correctAnswer;
    
    updatedQuestions[currentQuestion] = {
      ...currentQ,
      userAnswer: parseInt(answer),
      isCorrect: isCorrect
    };

    setQuestions(updatedQuestions);
    setUserAnswer('');

    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion < TOTAL_QUESTIONS - 1) {
      setCurrentQuestion(currentQuestion + 1);
      navigate(`/quiz/${currentQuestion + 1}`);
    } else {
      navigate('/results');
    }
  };

  const restartQuiz = () => {
    // Keep the same level when restarting
    const newQuestions = generateQuestions(selectedLevel);
    setQuestions(newQuestions);
    setCurrentQuestion(0);
    setScore(0);
    setUserAnswer('');
    navigate('/quiz/0');
  };

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className="app-container">
      <Routes>
        <Route 
          path="/" 
          element={
            <StartScreen 
              name={name} 
              onNameChange={setName} 
              onStartQuiz={handleStartQuiz} 
            />
          } 
        />
        <Route 
          path="/quiz" 
          element={
            <QuizQuestion
              currentQuestion={currentQuestion}
              totalQuestions={TOTAL_QUESTIONS}
              question={questions[currentQuestion]?.question || ''}
              userAnswer={userAnswer}
              score={score}
              onAnswerSubmit={() => handleAnswerSubmit(userAnswer)}
              onAnswerChange={setUserAnswer}
            />
          } 
        />
        <Route 
          path="/quiz/:questionIndex" 
          element={
            <QuizQuestion
              currentQuestion={currentQuestion}
              totalQuestions={TOTAL_QUESTIONS}
              question={questions[currentQuestion]?.question || ''}
              userAnswer={userAnswer}
              score={score}
              onAnswerSubmit={() => handleAnswerSubmit(userAnswer)}
              onAnswerChange={setUserAnswer}
            />
          } 
        />
        <Route 
          path="/results" 
          element={
            <QuizResult 
              name={name}
              score={score}
              totalQuestions={TOTAL_QUESTIONS}
              questions={questions}
              onRestart={restartQuiz}
              onGoHome={goToHome}
              level={selectedLevel}
            />
          } 
        />
        <Route 
          path="*" 
          element={
            <div className="app">
              <h1>Page Not Found</h1>
              <button onClick={() => navigate('/')} className="restart-button">
                Back to Home
              </button>
            </div>
          } 
        />
      </Routes>
    </div>
  );
}

export default App;
