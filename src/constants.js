export const TOTAL_QUESTIONS = 5;

export const LEVELS = {
  PRIMARY: {
    id: 'primary',
    name: 'Primary',
    min: 0,
    max: 9,
    description: 'For Primary level',
    NumbersUsed: 'Add 2-3 numbers (0-9)',
    color: '#FF9800',
    icon: 'star',
    operation: 'primary_addition',
    minNumbers: 2,
    maxNumbers: 3
  },
  BEGINNER: {
    id: 'beginner',
    name: 'Beginner',
    min: -9,
    max: 9,
    description: 'For Beginner level',
    NumbersUsed: 'Numbers between -9 and 9',
    color: '#4CAF50',
    icon: 'seedling',
    operation: 'addition'
  },
  INTERMEDIATE: {
    id: 'intermediate',
    name: 'Intermediate',
    min: -99,
    max: 99,
    description: 'For Intermediate level',
    NumbersUsed: 'Numbers between -99 and 99',
    color: '#2196F3',
    icon: 'arrow-up',
    operation: 'addition'
  },
  ADVANCED: {
    id: 'advanced',
    name: 'Advanced',
    min: -999,
    max: 999,
    description: 'For Advanced level',
    NumbersUsed: 'Numbers between -999 and 999',
    color: '#F44336',
    icon: 'rocket',
    operation: 'addition'
  },
  MACH: {
    id: 'mach',
    name: 'Mach',
    min: 1,
    max: 9,
    description: 'Multiplication challenge',
    NumbersUsed: 'Multiply 2-3 numbers (1-9)',
    color: '#9C27B0',
    icon: 'jet-fighter',
    operation: 'multiplication'
  }
};

export const DEFAULT_LEVEL = 'beginner';

export const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateQuestions = (level = DEFAULT_LEVEL, count = TOTAL_QUESTIONS) => {
  const levelConfig = Object.values(LEVELS).find(l => l.id === level) || LEVELS.BEGINNER;
  const newQuestions = [];
  
  for (let i = 0; i < count; i++) {
    let numCount, numbers, questionText, correctAnswer;
    
    if (levelConfig.operation === 'multiplication') {
      // For Mach level: multiply 2-3 numbers between 1-9
      numCount = Math.floor(Math.random() * 2) + 2; // 2 or 3 numbers
      numbers = [];
      questionText = '';
      correctAnswer = 1;
      
      for (let j = 0; j < numCount; j++) {
        const num = generateRandomNumber(levelConfig.min, levelConfig.max);
        numbers.push(num);
        questionText += j === 0 ? num : ` × ${num}`;
        correctAnswer *= num;
      }
    } else if (levelConfig.operation === 'primary_addition') {
      // For Primary level: add 2-3 numbers between 0-9
      numCount = Math.floor(Math.random() * 2) + 2; // 2 or 3 numbers
      numbers = [];
      questionText = '';
      correctAnswer = 0;
      
      for (let j = 0; j < numCount; j++) {
        const num = generateRandomNumber(levelConfig.min, levelConfig.max);
        numbers.push(num);
        questionText += j === 0 ? num : ` + ${num}`;
        correctAnswer += num;
      }
    } else {
      // For other levels: addition with 3-5 numbers
      numCount = Math.floor(Math.random() * 3) + 3; // 3 to 5 numbers
      numbers = [];
      questionText = '';
      correctAnswer = 0;
      
      for (let j = 0; j < numCount; j++) {
        const num = generateRandomNumber(levelConfig.min, levelConfig.max);
        numbers.push(num);
        questionText += j === 0 ? num : (num >= 0 ? ` + ${num}` : ` - ${Math.abs(num)}`);
        correctAnswer += num;
      }
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
