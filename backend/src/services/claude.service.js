const dotenv = require("dotenv");
dotenv.config();

const generateQuestions = async (subject, difficulty, count) => {
  count = count || 5;
  console.log("Generating questions for:", subject, difficulty);
  return getFallbackQuestions(subject, difficulty, count);
};

const generateFeedback = async (question, answer, subject, difficulty) => {
  console.log("Generating feedback...");
  return getFallbackFeedback(answer, question, subject);
};

const getFallbackQuestions = (subject, difficulty, count) => {
  console.log("Using fallback questions for:", subject);
  const questions = [
    {
      id: "q1",
      text: "What is " + subject + " and why is it important?",
      subject: subject,
      difficulty: difficulty,
      tags: [subject],
      expectedAnswer: "Definition and importance of " + subject
    },
    {
      id: "q2",
      text: "Explain the core concepts of " + subject,
      subject: subject,
      difficulty: difficulty,
      tags: [subject],
      expectedAnswer: "Core concepts and fundamentals"
    },
    {
      id: "q3",
      text: "What are the best practices when working with " + subject + "?",
      subject: subject,
      difficulty: difficulty,
      tags: [subject],
      expectedAnswer: "Industry best practices"
    },
    {
      id: "q4",
      text: "What are common mistakes developers make with " + subject + "?",
      subject: subject,
      difficulty: difficulty,
      tags: [subject],
      expectedAnswer: "Common pitfalls and how to avoid them"
    },
    {
      id: "q5",
      text: "How would you explain " + subject + " to a beginner?",
      subject: subject,
      difficulty: difficulty,
      tags: [subject],
      expectedAnswer: "Simple clear explanation"
    },
  ];
  return questions.slice(0, count);
};

const getFallbackFeedback = (answer, question, subject) => {
  const isEmpty = !answer || answer.trim().length < 5;
  const isShort = answer && answer.trim().length < 20;

  if (isEmpty) {
    return {
      score: 0,
      strengths: [],
      improvements: [
        "No answer was provided",
        "Please provide a detailed response"
      ],
      suggestion: "You did not provide an answer. Please try again with a detailed response.",
      questionId: "q1",
    };
  }

  if (isShort) {
    return {
      score: 10,
      strengths: ["Attempted to answer"],
      improvements: [
        "Answer is too short",
        "Provide more detailed explanation",
        "Include examples"
      ],
      suggestion: "Your answer is too brief. Please elaborate with more details and examples.",
      questionId: "q1",
    };
  }

  return {
    score: 35,
    strengths: ["Attempted to answer the question"],
    improvements: [
      "Provide more detailed explanation",
      "Include real world examples",
      "Cover edge cases"
    ],
    suggestion: "Your answer shows basic understanding of " + subject + ". Try to include more specific examples and deeper explanations.",
    questionId: "q1",
  };
};

module.exports = { generateQuestions, generateFeedback };