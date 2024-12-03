// /pages/api/generateSoftSkillsQuestions.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as fs from "fs";

require('dotenv').config();

const apiKey = process.env.GOOGLE_API_KEY;

if (!apiKey) {
  throw new Error("API Key não encontrada. Configure a variável GOOGLE_API_KEY no arquivo .env.");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
});

async function generateQuestions() {
  const prompt = `Crie 5 perguntas para um jogo de desenvolvimento de habilidades comportamentais focado em técnicas de comunicação, resolução de conflitos e cenários profissionais. Cada pergunta deve:
    - Descrever uma situação realista e relevante para um ambiente de trabalho ou de colaboração em equipe.
    - Incluir temas como liderança, empatia, adaptabilidade, comunicação interpessoal e resolução de problemas.
    - Somente o enunciado das perguntas, sem alternativas de resposta.
    Formate sua resposta como um objeto JSON com a seguinte chave: "question" (pergunta). Exemplo: {
      "question": "Como você responderia a um colega que critica seu trabalho de forma pública e direta em uma reunião?"
    }
    Por favor, forneça sua resposta em português e no formato JSON, sem colocar três aspas nem no começo nem no final do texto.`;

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

    const result = await chatSession.sendMessage("Por favor, gere as perguntas em português.");
    const responseText = result.response.text();

    const jsonData = JSON.parse(responseText);
    if (Array.isArray(jsonData) && jsonData.length === 5) {
      // Salvar perguntas em arquivo
      fs.writeFileSync("public/softSkillsQuestions.json", JSON.stringify(jsonData, null, 2));
      return jsonData;
    } else {
      throw new Error("Formato de JSON inválido");
    }
  } catch (error) {
    console.error("Erro ao gerar perguntas:", error);
    throw error;
  }
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const questions = await generateQuestions();
      res.status(200).json(questions);
    } catch (error) {
      res.status(500).json({ error: "Erro ao gerar perguntas. Consulte os logs para mais detalhes." });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
}