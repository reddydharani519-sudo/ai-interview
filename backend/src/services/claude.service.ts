import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY || ""
);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export const generateQuestions = async (
  subject: string,
  difficulty: string,
  count: number = 10
): Promise<any[]> => {
  try {
    const prompt = `
      Generate ${count} interview questions for ${subject} 
      at ${difficulty} difficulty level.
      
      Return ONLY a JSON array with this exact format:
      [
        {
          "id": "q1",
          "text": "question here",
          "subject": "${subject}",
          "difficulty": "${difficulty}",
          "tags": ["tag1", "tag2"],
          "expectedAnswer": "brief expected answer"
        }
      ]
      
      No markdown, no explanation, just the JSON array.
    `;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    const clean = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(clean);
  } catch (error) {
    console.error("Gemini error:", error);
    return getDefaultQuestions(subject, difficulty, count);
  }
};

export const generateFeedback = async (
  question: string,
  answer: string,
  subject: string,
  difficulty: string
): Promise<any> => {
  try {
    const prompt = `
      You are an expert ${subject} interviewer.
      
      Question: ${question}
      Candidate Answer: ${answer}
      
      Evaluate this answer and return ONLY a JSON object:
      {
        "score": <number 0-100>,
        "strengths": ["strength1", "strength2"],
        "improvements": ["improvement1", "improvement2"],
        "suggestion": "brief feedback in 2-3 sentences",
        "questionId": "q1"
      }
      
      No markdown, no explanation, just the JSON object.
    `;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    const clean = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(clean);
  } catch (error) {
    console.error("Gemini feedback error:", error);
    return {
      score: 70,
      strengths: ["Good attempt"],
      improvements: ["Add more detail"],
      suggestion:
        "Your answer shows basic understanding. Try to elaborate more with examples.",
      questionId: "q1",
    };
  }
};

// Fallback questions if API fails
const getDefaultQuestions = (
  subject: string,
  difficulty: string,
  count: number
) => {
  const questions = [
    {
      id: "q1",
      text: `Explain the core concepts of ${subject}`,
      subject,
      difficulty,
      tags: [subject],
      expectedAnswer: `Basic understanding of ${subject}`,
    },
    {
      id: "q2",
      text: `What are the best practices in ${subject}?`,
      subject,
      difficulty,
      tags: [subject, "best practices"],
      expectedAnswer: "Industry standard practices",
    },
    {
      id: "q3",
      text: `How do you handle errors in ${subject}?`,
      subject,
      difficulty,
      tags: [subject, "error handling"],
      expectedAnswer: "Error handling strategies",
    },
    {
      id: "q4",
      text: `Describe a challenging ${subject} problem you solved`,
      subject,
      difficulty,
      tags: [subject, "problem solving"],
      expectedAnswer: "Problem solving approach",
    },
    {
      id: "q5",
      text: `What are the latest trends in ${subject}?`,
      subject,
      difficulty,
      tags: [subject, "trends"],
      expectedAnswer: "Current industry trends",
    },
  ];
  return questions.slice(0, count);
};