import express from 'express';
const { Request, Response } = express; 
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyCBxNqSQIazpndg0Di_70RO6GUMoaMxvDk";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const app = express();
const port = 3000;

app.get("/generate-questions", async (req, res) => { // Removed type annotations
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {
              text: "Create questions for a soft skills development game",
            },
          ],
        },
      ],
    });

    const result = await chatSession.sendMessage("Please generate the questions.");
    res.json({ questions: result.response.text });
  } catch (error) {
    console.error("Error generating questions:", error);
    res.status(500).json({ error: "Error generating questions" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
