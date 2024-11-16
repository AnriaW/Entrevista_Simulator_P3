require('dotenv').config();


const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = "";
  const genAI = new GoogleGenerativeAI(apiKey);
  const fs = require('fs');

  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
  });
  
  async function run() {
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
  
    // Iniciar a sessão de chat com a IA
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
  
    try {
      const result = await chatSession.sendMessage("Por favor, gere as perguntas em português.");
      const responseText = result.response.text();
  
      console.log("Resposta da IA:", responseText);
  
      // Tente fazer o parse da resposta como JSON
      try {
        const jsonData = JSON.parse(responseText);
  
        // Validar se o formato está correto (um array com 5 perguntas)
        if (Array.isArray(jsonData) && jsonData.length === 5) {
          jsonData.forEach(question => {
            if (
              !question.question ||
              !Array.isArray(question.options) ||
              question.options.length !== 4 ||
              !question.correctAnswer
            ) {
              throw new Error("Formato da pergunta ou opções inválido.");
            }
          });
  
          // Se a estrutura for válida, salvar o JSON em um arquivo
          fs.writeFile('hardSkillsQuestions.json', JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
              console.error('Erro ao salvar o arquivo:', err);
            } else {
              console.log('JSON salvo em hardSkillsQuestions.json');
            }
          });
        } else {
          throw new Error("O formato do JSON não contém as perguntas no formato esperado.");
        }
      } catch (jsonError) {
        console.error('Erro ao parsear JSON:', jsonError);
      }
    } catch (error) {
      console.error('Erro ao gerar perguntas:', error);
    }
  }
  
  run();