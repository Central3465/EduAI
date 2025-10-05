// src/utils/assignmentData.js

// Sample assignment data structure
export const sampleAssignments = [
  {
    id: 1,
    title: "Introduction to Machine Learning",
    subject: "Computer Science",
    dueDate: "2024-01-15",
    status: "active",
    questions: [
      {
        id: 1,
        type: "multiple-choice",
        question: "What is Machine Learning?",
        options: [
          "A type of computer hardware",
          "A method of teaching computers to learn from data",
          "A programming language",
          "A type of database"
        ],
        correctAnswer: 1,
        aiGenerated: true
      },
      {
        id: 2,
        type: "short-answer",
        question: "Name two types of Machine Learning algorithms.",
        answer: "",
        aiGenerated: true
      }
    ],
    aiGenerated: true,
    grade: "A"
  }
];

// Question types
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
    icon: '.YesNo',
    requires: ['question', 'correctAnswer']
  }
};