import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator, faArrowRight, faTrophy } from '@fortawesome/free-solid-svg-icons';

const QuizQuestion = ({
  currentQuestion,
  totalQuestions,
  question,
  userAnswer,
  score,
  onAnswerSubmit,
  onAnswerChange,
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [currentQuestion]);

  return (
    <div className="app">
      <div className="quiz-container">
        <div className="quiz-header">
          <div className="progress-container">
            <div 
              className="progress-bar" 
              style={{
                width: `${((currentQuestion + 1) / totalQuestions) * 100}%`
              }}
            ></div>
            <div className="progress-text">
              Question {currentQuestion + 1} of {totalQuestions}
            </div>
          </div>
          <div className="score-display">
            <FontAwesomeIcon icon={faTrophy} className="score-icon" />
            <span className="score-value">{score}</span>
          </div>
        </div>
        
        <div className="question-card">
          <div className="question-header">
            <FontAwesomeIcon icon={faCalculator} className="calculator-icon" />
            <h2>Calculate the following:</h2>
          </div>
          
          <div className="question-text">
            <span className="expression">{question}</span>
            <span className="equals">=</span>
            <span className="question-mark">?</span>
          </div>
          
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              onAnswerSubmit();
            }} 
            className="answer-form"
          >
            <div className="input-group">
              <input
                ref={inputRef}
                type="number"
                value={userAnswer}
                onChange={(e) => onAnswerChange(e.target.value)}
                placeholder="Your answer here..."
                className="answer-input"
                required
                autoFocus
              />
            </div>
            
            <div className="button-container">
              <button type="submit" className="submit-button">
                {currentQuestion === totalQuestions - 1 ? (
                  <>
                    Finish Quiz <FontAwesomeIcon icon={faTrophy} className="button-icon" />
                  </>
                ) : (
                  <>
                    Next Question <FontAwesomeIcon icon={faArrowRight} className="button-icon" />
                  </>
                )}
              </button>
            </div>
          </form>
          
          <div className="question-progress">
            {Array.from({ length: totalQuestions }).map((_, index) => (
              <div 
                key={index}
                className={`progress-dot ${index <= currentQuestion ? 'active' : ''} ${
                  index < currentQuestion ? 'completed' : ''
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizQuestion;
