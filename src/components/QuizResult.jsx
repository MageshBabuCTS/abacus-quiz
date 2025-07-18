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
  questions = [], 
  onRestart, 
  onGoHome,
  level 
}) => {
  // Calculate statistics from questions array
  const totalAnswered = questions.filter(q => q.userAnswer !== undefined && q.userAnswer !== '').length;
  const correctCount = questions.filter(q => 
    q.userAnswer !== undefined && 
    q.userAnswer !== '' && 
    String(q.userAnswer).trim() === String(q.correctAnswer).trim()
  ).length;
  const incorrectCount = totalAnswered - correctCount;
  const unansweredCount = questions.length - totalAnswered;
  
  const correctPercentage = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;
  const incorrectPercentage = questions.length > 0 ? Math.round((incorrectCount / questions.length) * 100) : 0;
  const unansweredPercentage = 100 - correctPercentage - incorrectPercentage;
  
  const levelConfig = LEVELS[level?.toUpperCase()] || LEVELS.BEGINNER;
  
  // Determine result level and set appropriate icon and message
  const getResultData = () => {
    const percentage = correctPercentage;
    if (percentage === 100) {
      return {
        icon: faTrophy,
        message: `Perfect! You're a ${levelConfig.name.toLowerCase()} math wizard! 🎯`,
        className: 'perfect-score'
      };
    } else if (percentage >= 80) {
      return {
        icon: faThumbsUp,
        message: `Excellent work on ${levelConfig.name.toLowerCase()} level!`,
        className: 'excellent-score'
      };
    } else if (percentage >= 60) {
      return {
        icon: faSmileBeam,
        message: `Good job on the ${levelConfig.name.toLowerCase()} level!`,
        className: 'good-score'
      };
    } else if (percentage >= 40) {
      return {
        icon: faMeh,
        message: `Not bad for ${levelConfig.name.toLowerCase()} level!`,
        className: 'average-score'
      };
    } else {
      return {
        icon: faFire,
        message: `Keep practicing the ${levelConfig.name.toLowerCase()} level!`,
        className: 'keep-trying-score'
      };
    }
  };

  const { icon, message, className } = getResultData();
  
  // Get level icon
  const getLevelIcon = () => {
    switch(levelConfig.id) {
      case 'beginner': return faSeedling;
      case 'intermediate': return faArrowUp;
      case 'advanced': return faRocket;
      case 'mach': return faFire;
      default: return faSeedling;
    }
  };

  // Check if answer is correct
  const isAnswerCorrect = (question) => {
    if (!question) return false;
    // Handle both string and number comparisons
    return String(question.userAnswer).trim() === String(question.correctAnswer).trim();
  };

  return (
    <div className="app">
      <div className={`quiz-container result-container ${className}`}>
        <div className="result-header">
          <h1>Quiz Completed, {name}!</h1>
          <p className="result-subtitle">
            You scored {correctCount} out of {questions.length} on the {levelConfig.name.toLowerCase()} level
          </p>
          
          <div className="result-icon">
            <FontAwesomeIcon icon={icon} size="3x" />
          </div>
          
          <div className="score-display">
            <span className="score">{correctCount}</span>
            <span className="score-separator">/</span>
            <span className="total-questions">{questions.length}</span>
          </div>
          
          <p className="result-message">{message}</p>
          
          <div className="result-stats">
            <div className="stat-item">
              <span className="stat-value">{correctPercentage}%</span>
              <span className="stat-label">Correct ({correctCount})</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{incorrectPercentage}%</span>
              <span className="stat-label">Incorrect ({incorrectCount})</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">
                {levelConfig.min}-{levelConfig.max}
              </span>
              <span className="stat-label">Number Range</span>
            </div>
          </div>
        </div>
        
        <div className="results-section">
          <h3>Your Answers:</h3>
          <div className="answers-grid">
            {questions.map((question, index) => {
              const correct = isAnswerCorrect(question);
              return (
                <div key={index} className={`answer-item ${correct ? 'correct' : 'incorrect'}`}>
                  <div className="question-number">Q{index + 1}</div>
                  <div className="question-details">
                    <div className="question-text">
                      {question.question} = {question.correctAnswer}
                    </div>
                    <div className="user-answer">
                      Your answer: {correct ? (
                        <span className="correct-answer">{question.userAnswer}</span>
                      ) : (
                        <>
                          <span className="wrong-answer">{question.userAnswer}</span>
                          <span className="correct-answer"> (Correct: {question.correctAnswer})</span>
                        </>
                      )}
                      <FontAwesomeIcon 
                        icon={correct ? faStar : faSadTear} 
                        className={`answer-icon ${correct ? 'correct' : 'incorrect'}`} 
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="result-actions">
          <button 
            onClick={onRestart} 
            className="action-button restart"
          >
            <FontAwesomeIcon icon={faSyncAlt} /> Try Again
          </button>
          <button 
            onClick={onGoHome} 
            className="action-button home"
          >
            <FontAwesomeIcon icon={faHome} /> Change Level
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;
