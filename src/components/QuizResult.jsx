import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTrophy, 
  faThumbsUp, 
  faStar, 
  faSadTear, 
  faFire, 
  faSeedling, 
  faArrowUp, 
  faRocket,
  faSyncAlt,
  faHome
} from '@fortawesome/free-solid-svg-icons';
import { faSmileBeam, faMeh } from '@fortawesome/free-regular-svg-icons';
import { LEVELS } from '../constants';

const QuizResult = ({ 
  name, 
  score, 
  totalQuestions, 
  questions, 
  onRestart, 
  onGoHome,
  level 
}) => {
  const percentage = (score / totalQuestions) * 100;
  const levelConfig = Object.values(LEVELS).find(l => l.id === level) || LEVELS.BEGINNER;
  
  let resultIcon;
  let resultMessage;
  let resultClass;

  // Determine result level and set appropriate icon and message
  if (percentage === 100) {
    resultIcon = <FontAwesomeIcon icon={faTrophy} className="result-icon perfect" />;
    resultMessage = `Perfect! You're a ${levelConfig.name.toLowerCase()} math wizard! 🎯`;
    resultClass = 'perfect-score';
  } else if (percentage >= 80) {
    resultIcon = <FontAwesomeIcon icon={faThumbsUp} className="result-icon excellent" />;
    resultMessage = `Excellent work on ${levelConfig.name.toLowerCase()} level! You're really good at this! 🌟`;
    resultClass = 'excellent-score';
  } else if (percentage >= 60) {
    resultIcon = <FontAwesomeIcon icon={faSmileBeam} className="result-icon good" />;
    resultMessage = `Good job! With a little more practice, you'll master the ${levelConfig.name.toLowerCase()} level! 👍`;
    resultClass = 'good-score';
  } else if (percentage >= 40) {
    resultIcon = <FontAwesomeIcon icon={faMeh} className="result-icon average" />;
    resultMessage = `Not bad for ${levelConfig.name.toLowerCase()} level! Keep practicing and you'll improve! 💪`;
    resultClass = 'average-score';
  } else {
    resultIcon = <FontAwesomeIcon icon={faFire} className="result-icon keep-trying" />;
    resultMessage = `Keep trying the ${levelConfig.name.toLowerCase()} level! Every expert was once a beginner. 🔥`;
    resultClass = 'keep-trying-score';
  }
  
  const getLevelIcon = (levelId) => {
    switch (levelId) {
      case 'beginner':
        return <FontAwesomeIcon icon={faSeedling} className="level-icon" />;
      case 'intermediate':
        return <FontAwesomeIcon icon={faArrowUp} className="level-icon" />;
      case 'advanced':
        return <FontAwesomeIcon icon={faRocket} className="level-icon" />;
      default:
        return <FontAwesomeIcon icon={faSeedling} className="level-icon" />;
    }
  };

  return (
    <div className="app">
      <div className={`quiz-container result-container ${resultClass}`}>
        <div className="result-header">
          <div className="result-title">
            <h1>Quiz Completed, {name}!</h1>
            <p className="result-subtitle">You've completed the {levelConfig.name.toLowerCase()} level!</p>
          </div>
          
          <div className="level-badge" style={{ '--level-color': levelConfig.color }}>
            {getLevelIcon(level)}
            <span>{levelConfig.name} Level</span>
          </div>
          
          <div className="score-display">
            <span className="score">{score}</span>
            <span className="score-separator">/</span>
            <span className="total-questions">{totalQuestions}</span>
          </div>
          
          <div className="result-icon-container">
            {resultIcon}
          </div>
          
          <p className="result-message">{resultMessage}</p>
          
          <div className="result-stats">
            <div className="stat-item">
              <span className="stat-value">{Math.round(percentage)}%</span>
              <span className="stat-label">Correct</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{totalQuestions - score}</span>
              <span className="stat-label">Incorrect</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">
                {questions[0]?.level === 'beginner' ? '1-9' : 
                 questions[0]?.level === 'intermediate' ? '1-99' : '1-999'}
              </span>
              <span className="stat-label">Number Range</span>
            </div>
          </div>
        </div>
        
        <div className="results">
          <h3>Your Answers:</h3>
          <div className="answers-grid">
            {questions.map((q, index) => (
              <div key={index} className={`result-item ${q.isCorrect ? 'correct' : 'incorrect'}`}>
                <div className="question-number">Q{index + 1}</div>
                <div className="question-details">
                  <p className="question-text">{q.question} = {q.correctAnswer}</p>
                  <p className="user-answer">
                    Your answer: {q.isCorrect ? (
                      <span className="correct-answer">{q.userAnswer}</span>
                    ) : (
                      <>
                        <span className="wrong-answer">{q.userAnswer}</span>
                        <span className="correct-answer"> (Correct: {q.correctAnswer})</span>
                      </>
                    )}
                    {q.isCorrect ? (
                      <FontAwesomeIcon icon={faStar} className="answer-icon correct" />
                    ) : (
                      <FontAwesomeIcon icon={faSadTear} className="answer-icon incorrect" />
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="button-container">
          <button onClick={onRestart} className="action-button restart-button">
            <FontAwesomeIcon icon={faSyncAlt} className="button-icon" />
            Try Again
          </button>
          <button onClick={onGoHome} className="action-button home-button">
            <FontAwesomeIcon icon={faHome} className="button-icon" />
            Change Level
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;
