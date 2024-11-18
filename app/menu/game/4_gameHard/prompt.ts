import * as fs from "fs";

require('dotenv').config();

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Configurar a API Key a partir da variável de ambiente
const apiKey = process.env.GOOGLE_API_KEY;

if (!apiKey) {
  throw new Error("API Key não encontrada. Configure a variável GOOGLE_API_KEY no arquivo .env.");
}

// Instanciar o cliente Google Generative AI
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
});

  async function generateQuestions() {
    // Configuração do prompt para pedir para a IA gerar perguntas em formato JSON
    const prompt = `Crie 5 perguntas para um jogo de habilidades técnicas focadas em tecnologias de backend. Cada pergunta deve:
    - Descrever uma situação realista e relevante para um ambiente de trabalho ou colaboração em equipe.
    - Apresentar quatro opções de resposta, sendo uma a mais adequada para desenvolver uma tarefa específica e as outras representando escolhas menos eficazes.
    - Incluir a resposta correta no final de cada pergunta.
    Formate sua resposta como um objeto JSON com as seguintes chaves: "question" (pergunta), "options" (opções), "correctAnswer" (resposta correta). Exemplo: {
      "question": "Qual tecnologia seria a mais adequada para desenvolver uma API RESTful?",
      "options": ["PHP com Laravel", "Ruby on Rails", "Node.js com Express", "Python com Django"],
      "correctAnswer": "Node.js com Express"
    }
    Por favor, forneça sua resposta em português e no formato JSON sem colocar três aspas nem no começo nem no final do texto.`;
  //isso foi fofo
    // Iniciar a sessão de chat com a IA
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
        jsonData.forEach((question) => {
          if (
            !question.question ||
            !Array.isArray(question.options) ||
            question.options.length !== 4 ||
            !question.correctAnswer
          ) {
            throw new Error("Formato da pergunta ou opções inválido.");
          }
        });
  
        // Salvar perguntas em arquivo
        fs.writeFileSync("public/hardSkillsQuestions.json", JSON.stringify(jsonData, null, 2));
        return jsonData;
      } else {
        throw new Error("Formato de JSON inválido");
      }
    } catch (error) {
      console.error("Erro ao gerar perguntas:", error);
      throw error;
    }
  }
  
  // Método GET exportado
  export async function GET() {
    try {
      const questions = await generateQuestions();
      return Response.json(questions);
    } catch (error) {
      return Response.json(
        { error: "Erro ao gerar perguntas. Consulte os logs para mais detalhes." },
        { status: 500 }
      );
    }
  }