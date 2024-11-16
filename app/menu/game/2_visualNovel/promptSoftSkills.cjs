require('dotenv').config();

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = "" ;
const genAI = new GoogleGenerativeAI(apiKey);
const fs = require('fs');

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
});


async function run() {

  const prompt = `Crie 5 perguntas para um jogo de desenvolvimento de habilidades comportamentais focado em técnicas de comunicação, resolução de conflitos e cenários profissionais. Cada pergunta deve:
  - Descrever uma situação realista e relevante para um ambiente de trabalho ou de colaboração em equipe.
  - Incluir temas como liderança, empatia, adaptabilidade, comunicação interpessoal e resolução de problemas.
  - Somente o enunciado das perguntas, sem alternativas de resposta.
  Formate sua resposta como um objeto JSON com a seguinte chave: "question" (pergunta). Exemplo: {
    "question": "Como você responderia a um colega que critica seu trabalho de forma pública e direta em uma reunião?"
  }
  Por favor, forneça sua resposta em português e no formato JSON, sem colocar três aspas nem no começo nem no final do texto.`;


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

      // Se a estrutura for válida, salvar o JSON em um arquivo
      fs.writeFile('softSkillsQuestions.json', JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
          console.error('Erro ao salvar o arquivo:', err);
        } else {
          console.log('JSON salvo em softSkillsQuestions.json');
        }
      });

  } catch (jsonError) {
    console.error('Erro ao parsear JSON:', jsonError);
  }
} catch (error) {
  console.error('Erro ao gerar perguntas:', error);
}

}

run();


