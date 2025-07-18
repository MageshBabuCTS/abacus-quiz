import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import StartScreen from './components/StartScreen';
import QuizQuestion from './components/QuizQuestion';
import QuizResult from './components/QuizResult';
import { generateQuestions, TOTAL_QUESTIONS, DEFAULT_LEVEL } from './constants';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(DEFAULT_LEVEL);
  const navigate = useNavigate();
  const { questionIndex } = useParams() || {};

  // Initialize questions when component mounts or level changes
  useEffect(() => {
    if (questionIndex !== undefined) {
      const index = parseInt(questionIndex, 10);
      if (!isNaN(index) && index >= 0 && index < TOTAL_QUESTIONS) {
        setCurrentQuestionIndex(index);
      }
    }
  }, [questionIndex]);

  const handleStartQuiz = (username, level = DEFAULT_LEVEL) => {
    if (username && username.trim()) {
      setName(username);
      setSelectedLevel(level);
      const newQuestions = generateQuestions(level).map(q => ({
        ...q,
        userAnswer: '',
        isAnswered: false
      }));
      setQuestions(newQuestions);
      setCurrentQuestionIndex(0);
      setScore(0);
      navigate('/quiz/0');
    }
  };

  const handleAnswerChange = (answer) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex] = {
      ...updatedQuestions[currentQuestionIndex],
      userAnswer: answer,
      isAnswered: answer !== ''
    };
    setQuestions(updatedQuestions);
  };

  const handleAnswerSubmit = () => {
    const currentQ = questions[currentQuestionIndex];
    if (!currentQ || currentQ.userAnswer === '') return;

    const userAnswer = parseInt(currentQ.userAnswer, 10);
    const correctAnswer = parseInt(currentQ.correctAnswer, 10);
    const isCorrect = userAnswer === correctAnswer;
    
    setQuestions(prevQuestions => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[currentQuestionIndex] = {
        ...currentQ,
        userAnswer: userAnswer.toString(),
        isCorrect,
        isAnswered: true
      };
      return updatedQuestions;
    });
    
    // Update score if the answer is correct and wasn't already counted
    if (isCorrect && !currentQ.isAnswered) {
      setScore(prevScore => prevScore + 1);
    }

    // Move to next question if not the last one
    if (currentQuestionIndex < TOTAL_QUESTIONS - 1) {
      navigate(`/quiz/${currentQuestionIndex + 1}`);
    } else {
      navigate('/results');
    }
  };

  const goToNextQuestion = (targetIndex = null) => {
    const nextIndex = targetIndex !== null ? targetIndex : currentQuestionIndex + 1;
    if (nextIndex < TOTAL_QUESTIONS) {
      setCurrentQuestionIndex(nextIndex);
      navigate(`/quiz/${nextIndex}`);
    }
  };

  const goToPrevQuestion = (targetIndex = null) => {
    const prevIndex = targetIndex !== null ? targetIndex : currentQuestionIndex - 1;
    if (prevIndex >= 0) {
      setCurrentQuestionIndex(prevIndex);
      navigate(`/quiz/${prevIndex}`);
    }
  };

  const restartQuiz = () => {
    const newQuestions = generateQuestions(selectedLevel).map(q => ({
      ...q,
      userAnswer: '',
      isAnswered: false
    }));
    setQuestions(newQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
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
          path="/quiz/:questionIndex" 
          element={
            questions.length > 0 && currentQuestionIndex < questions.length ? (
              <QuizQuestion
                currentQuestion={currentQuestionIndex}
                totalQuestions={TOTAL_QUESTIONS}
                question={questions[currentQuestionIndex]?.question || ''}
                userAnswer={questions[currentQuestionIndex]?.userAnswer || ''}
                score={score}
                onAnswerSubmit={handleAnswerSubmit}
                onAnswerChange={handleAnswerChange}
                onNextQuestion={goToNextQuestion}
                onPrevQuestion={goToPrevQuestion}
              />
            ) : null
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
              <button onClick={goToHome} className="restart-button">
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
