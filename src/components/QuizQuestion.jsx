import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator, faArrowRight, faArrowLeft, faTrophy } from '@fortawesome/free-solid-svg-icons';

const QuizQuestion = ({
  currentQuestion,
  totalQuestions,
  question,
  userAnswer,
  score,
  onAnswerSubmit,
  onAnswerChange,
  onPrevQuestion,
  onNextQuestion,
}) => {
  const inputRef = useRef(null);
  const isFirstQuestion = currentQuestion === 0;
  const isLastQuestion = currentQuestion === totalQuestions - 1;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [currentQuestion]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Only submit the answer if we're not on the last question
    if (isLastQuestion) {
      onAnswerSubmit();
    } else {
      // For non-last questions, just move to the next question
      onNextQuestion();
    }
  };

  const handleNextClick = (e) => {
    e.preventDefault();
    onNextQuestion();
  };

  const handleBackClick = (e) => {
    e.preventDefault();
    onPrevQuestion();
  };

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
          
          <form onSubmit={handleSubmit} className="answer-form">
            <div className="input-group">
              <input
                ref={inputRef}
                type="number"
                value={userAnswer}
                onChange={(e) => onAnswerChange(e.target.value)}
                onWheel={(e) => e.target.blur()}
                placeholder="Your answer here..."
                className="answer-input"
                required={!isLastQuestion}
                autoFocus
              />
            </div>
            
            <div className="button-container" style={{ justifyContent: 'space-between' }}>
              {!isFirstQuestion && (
                <button 
                  type="button" 
                  onClick={handleBackClick}
                  className="action-button back-button"
                >
                  <FontAwesomeIcon icon={faArrowLeft} className="button-icon" /> Back
                </button>
              )}
              
              <button 
                type={isLastQuestion ? "submit" : "button"}
                onClick={!isLastQuestion ? handleNextClick : undefined}
                className={`action-button ${isLastQuestion ? 'finish-button' : 'next-button'}`}
              >
                {isLastQuestion ? (
                  <>
                    Finish Quiz <FontAwesomeIcon icon={faTrophy} className="button-icon" />
                  </>
                ) : (
                  <>
                    Next <FontAwesomeIcon icon={faArrowRight} className="button-icon" />
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
                onClick={() => {
                  const questionIndex = parseInt(index);
                  if (questionIndex < currentQuestion) {
                    onPrevQuestion(questionIndex);
                  } else if (questionIndex > currentQuestion) {
                    onNextQuestion(questionIndex);
                  }
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizQuestion;
