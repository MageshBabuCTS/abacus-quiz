import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling, faArrowUp, faRocket } from '@fortawesome/free-solid-svg-icons';
import { LEVELS, DEFAULT_LEVEL } from '../constants';

const StartScreen = ({ name, onNameChange, onStartQuiz }) => {
  const [selectedLevel, setSelectedLevel] = useState(DEFAULT_LEVEL);
  const [showLevels, setShowLevels] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && name.trim()) {
      onStartQuiz(name, selectedLevel);
    }
  };

  const getLevelIcon = (levelId) => {
    switch (levelId) {
      case 'beginner':
        return <FontAwesomeIcon icon={faSeedling} className="level-icon" />;
      case 'intermediate':
        return <FontAwesomeIcon icon={faArrowUp} className="level-icon" />;
      case 'advanced':
        return <FontAwesomeIcon icon={faRocket} className="level-icon" />;
      default:
        return null;
    }
  };

  const selectedLevelConfig = Object.values(LEVELS).find(level => level.id === selectedLevel) || LEVELS.BEGINNER;

  return (
    <div className="app">
      <div className="start-screen">
        <h1>Mental Arithmetic Abacus Quiz</h1>
        <p className="subtitle">Test your mental math skills at different difficulty levels</p>
        
        <form onSubmit={handleSubmit} className="start-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Your Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="Enter your name"
              className="name-input"
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label className="form-label">Select Difficulty Level</label>
            <div 
              className="level-selector" 
              onClick={() => setShowLevels(!showLevels)}
            >
              <div className="selected-level">
                {getLevelIcon(selectedLevel)}
                <span>{selectedLevelConfig.name}</span>
                <span className="level-description">{selectedLevelConfig.description}</span>
                <span className="dropdown-arrow">▼</span>
              </div>
              
              {showLevels && (
                <div className="level-options">
                  {Object.values(LEVELS).map((level) => (
                    <div 
                      key={level.id}
                      className={`level-option ${selectedLevel === level.id ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedLevel(level.id);
                        setShowLevels(false);
                      }}
                      style={{ '--level-color': level.color }}
                    >
                      {getLevelIcon(level.id)}
                      <div className="level-info">
                        <span className="level-name">{level.name}</span>
                        <span className="level-desc">{level.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button type="submit" className="start-button">
            Start Quiz
            <span className="button-icon">→</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default StartScreen;
