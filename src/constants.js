export const TOTAL_QUESTIONS = 5;

export const LEVELS = {
  BEGINNER: {
    id: 'beginner',
    name: 'Beginner',
    min: -9,
    max: 9,
    description: 'For  Beginner level',
    NumbersUsed: 'Numbers between -9 and 9',
    color: '#4CAF50',
    icon: 'seedling'
  },
  INTERMEDIATE: {
    id: 'intermediate',
    name: 'Intermediate',
    min: -99,
    max: 99,
    description: 'For  Intermediate level',
    NumbersUsed: 'Numbers between -99 and 99',
    color: '#2196F3',
    icon: 'arrow-up'
  },
  ADVANCED: {
    id: 'advanced',
    name: 'Advanced',
    min: -999,
    max: 999,
    description: 'For  Advanced level',
    NumbersUsed: ' Numbers between -999 and 999',
    color: '#F44336',
    icon: 'rocket'
  }
};

export const DEFAULT_LEVEL = LEVELS.BEGINNER.id;

export const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateQuestions = (level = DEFAULT_LEVEL, count = TOTAL_QUESTIONS) => {
  const levelConfig = Object.values(LEVELS).find(l => l.id === level) || LEVELS.BEGINNER;
  const newQuestions = [];
  
  for (let i = 0; i < count; i++) {
    const numCount = Math.floor(Math.random() * 3) + 3; // 3 to 5 numbers
    const numbers = [];
    let questionText = '';
    let correctAnswer = 0;

    for (let j = 0; j < numCount; j++) {
      const num = generateRandomNumber(levelConfig.min, levelConfig.max);
      numbers.push(num);
      questionText += j === 0 ? num : (num >= 0 ? ` + ${num}` : ` - ${Math.abs(num)}`);
      correctAnswer += num;
    }

    newQuestions.push({
      id: i,
      question: questionText,
      correctAnswer: correctAnswer,
      userAnswer: null,
      isCorrect: null,
      level: levelConfig.id
    });
  }
  
  return newQuestions;
};
