// src/utils/assignmentUtils.js

export const questionTypes = {
  'multiple-choice': {
    name: 'Multiple Choice',
    icon: '📋',
    requires: ['question', 'options', 'correctAnswer']
  },
  'short-answer': {
    name: 'Short Answer',
    icon: '✍️',
    requires: ['question']
  },
  'true-false': {
    name: 'True/False',
    icon: '✅❌',
    requires: ['question', 'correctAnswer']
  },
  'fill-in-blank': {
    name: 'Fill in the Blank',
    icon: '___',
    requires: ['question', 'correctAnswer']
  }
};

export const createAssignment = (data) => {
  return {
    id: Date.now(),
    title: data.title,
    subject: data.subject,
    dueDate: data.dueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'active',
    questions: data.questions || [],
    aiGenerated: data.aiGenerated || false,
    createdAt: new Date().toISOString(),
    difficulty: data.difficulty || 'medium',
    totalQuestions: data.questions?.length || 0
  };
};

export const createQuestion = (data) => {
  return {
    id: Date.now(),
    type: data.type,
    question: data.question,
    options: data.options || [],
    correctAnswer: data.correctAnswer,
    points: data.points || 1,
    aiGenerated: data.aiGenerated || false
  };
};