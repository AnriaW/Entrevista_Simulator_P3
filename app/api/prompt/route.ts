import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as fs from "fs";
import path from "path";

require('dotenv').config();

const apiKey = "AIzaSyAo0g-0cLvGCPAiL16mtN3CuOIs4bNTHVw ";

if (!apiKey) {
  throw new Error("API Key não encontrada. Configure a variável GOOGLE_API_KEY no arquivo .env.");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
});

const QUESTIONS_FILE_PATH = path.join(process.cwd(), 'app/menu/game/5_softSkills/softSkillsQuestions.json');

function readQuestionsFromFile() {
  const fileContent = fs.readFileSync(QUESTIONS_FILE_PATH, 'utf-8');
  const { questions } = JSON.parse(fileContent);
  return questions;
}

async function generateFeedback(answers: string[]) {
  const prompt = `
    Avalie as seguintes respostas fornecidas por um usuário a perguntas sobre habilidades comportamentais numa entrevista de emprego, por favor nao escreva caracteres especias como "*" ou aspas, de apenas o feedback de maneira direta:
    Perguntas e respostas:
    ${answers.map((answer, idx) => `Pergunta ${idx + 1}: ${answer}`).join("\n")}

    Forneça um feedback construtivo sobre o desempenho do usuário, destacando pontos positivos e áreas de melhoria.
  `;

  try {
    const chatSession = model.startChat({
      generationConfig: {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
      },
      history: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    const result = await chatSession.sendMessage("Por favor, gere o feedback com base nas respostas.");
    return result.response.text();
  } catch (error) {
    console.error("Erro ao gerar feedback:", error);
    throw error;
  }
}

export async function GET(req: NextRequest) {
  try {
    const questions = readQuestionsFromFile();
    return NextResponse.json({ questions });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao ler as perguntas." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { answers } = await req.json();
    if (!Array.isArray(answers) || answers.length !== 5) {
      return NextResponse.json({ error: "É necessário fornecer 5 respostas." }, { status: 400 });
    }

    const feedback = await generateFeedback(answers);
    return NextResponse.json({ feedback });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao gerar feedback." }, { status: 500 });
  }
}
