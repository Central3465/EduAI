// src/services/aiService.js
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY, // ✅ Vite uses import.meta.env
  dangerouslyAllowBrowser: true // Only for development!
});

let totalTokensUsed = 0;

export const trackUsage = (inputTokens, outputTokens) => {
  totalTokensUsed += inputTokens + outputTokens;
  console.log(`Total tokens used: ${totalTokensUsed}`);
  
  // Alert if approaching limits
  if (totalTokensUsed > 1000000) { // Adjust as needed
    console.warn('Approaching token limit!');
  }
};

// AI Question Generation
export const generateQuestion = async (subject, difficulty, questionType, topic) => {
  try {
    const prompt = `Generate a ${difficulty} ${questionType} question about ${topic} in the subject of ${subject}. 
    Provide the question, options (if multiple choice), and the correct answer.
    Format as JSON: {
      "question": "The question text",
      "type": "multiple-choice|true-false|short-answer",
      "options": ["option1", "option2", ...],
      "correctAnswer": "index or text",
      "explanation": "Brief explanation of the answer"
    }`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 500,
    });

    // Parse the JSON response
    const content = response.choices[0].message.content;
    return JSON.parse(content);
  } catch (error) {
    console.error('AI Question Generation Error:', error);
    throw error;
  }
};

// AI Assignment Generation
export const generateAssignment = async (subject, topic, difficulty, numQuestions) => {
  try {
    const prompt = `Generate a ${difficulty} assignment about ${topic} in ${subject} with ${numQuestions} questions.
    Include a mix of question types (multiple choice, short answer, true/false).
    Format as JSON: {
      "title": "Assignment Title",
      "subject": "${subject}",
      "questions": [
        {
          "question": "question text",
          "type": "type",
          "options": ["opt1", "opt2"],
          "correctAnswer": "answer",
          "explanation": "why this is correct"
        }
      ]
    }`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const content = response.choices[0].message.content;
    const jsonString = content.replace(/^```json\s*|\s*```$/g, '').trim();
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('AI Assignment Generation Error:', error);
    throw error;
  }
};

// AI Feedback Generation
export const generateFeedback = async (question, studentAnswer, correctAnswer) => {
  try {
    const prompt = `Provide constructive feedback for this student answer:
    Question: ${question}
    Student Answer: ${studentAnswer}
    Correct Answer: ${correctAnswer}
    
    Format as JSON: {
      "isCorrect": boolean,
      "feedback": "detailed feedback",
      "suggestion": "how to improve",
      "grade": "A/B/C/D/F"
    }`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.5,
      max_tokens: 300,
    });

    const content = response.choices[0].message.content;
    return JSON.parse(content);
  } catch (error) {
    console.error('AI Feedback Generation Error:', error);
    throw error;
  }
};