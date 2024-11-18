"use client";

import { useState, useEffect } from "react";

export default function SoftSkillsPage() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Índice da pergunta atual
  const [userAnswer, setUserAnswer] = useState(""); // Resposta do usuário
  const [feedback, setFeedback] = useState(""); // Feedback gerado pela IA
  const [submittedAnswers, setSubmittedAnswers] = useState<string[]>([]); // Respostas enviadas

  // Busca as perguntas do JSON
  const fetchQuestions = async () => {
    setLoading(true);
    setError("");
    setQuestions([]);
    setFeedback("");
    setCurrentQuestionIndex(0);
    setSubmittedAnswers([]);

    try {
      const response = await fetch("/softSkillsQuestions.json");
      if (!response.ok) {
        throw new Error("Erro ao buscar perguntas");
      }
      const data = await response.json();
      setQuestions(data);
    } catch (err: any) {
      setError(err.message || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = async () => {
    if (!userAnswer.trim()) {
      alert("Por favor, escreva uma resposta.");
      return;
    }

    try {
      // Envia a resposta para a IA para gerar feedback
      const response = await fetch("/api/ai-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: questions[currentQuestionIndex].question, answer: userAnswer }),
      });

      if (!response.ok) {
        throw new Error("Erro ao gerar feedback.");
      }

      const data = await response.json();
      setFeedback(data.feedback); // Exibe o feedback gerado pela IA

      // Salva a resposta enviada
      setSubmittedAnswers((prev) => [...prev, userAnswer]);
      setUserAnswer(""); // Limpa a resposta do usuário

      // Avança para a próxima pergunta
      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex((prev) => prev + 1);
      }
    } catch (err: any) {
      setError(err.message || "Erro desconhecido");
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Teste de Soft Skills</h1>

      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        questions.length > 0 && currentQuestionIndex < questions.length && (
          <div>
            <p className="text-xl font-semibold mb-4">{`Pergunta ${currentQuestionIndex + 1}: ${
              questions[currentQuestionIndex].question
            }`}</p>

            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              rows={4}
              placeholder="Escreva sua resposta aqui..."
            ></textarea>

            <button
              onClick={submitAnswer}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Enviar Resposta
            </button>

            {feedback && (
              <div className="mt-4 p-4 border rounded bg-gray-100">
                <strong>Feedback:</strong>
                <p>{feedback}</p>
              </div>
            )}
          </div>
        )
      )}

      {currentQuestionIndex >= questions.length && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Resultado Final</h2>
          <ul>
            {submittedAnswers.map((answer, idx) => (
              <li key={idx} className="mb-4 border-b pb-2">
                <p>
                  <strong>Pergunta {idx + 1}:</strong> {questions[idx].question}
                </p>
                <p>
                  <strong>Sua Resposta:</strong> {answer}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}