"use client";

import { ArrowLeftCircle } from 'lucide-react'
import { useEffect, useState } from "react";
import Link from "next/link";
 
export default function SoftSkillsPage() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [submittedAnswers, setSubmittedAnswers] = useState<string[]>([]);
 
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
      const response = await fetch("/menu/game/5_softSkills/ai-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: questions[currentQuestionIndex].question,
          answer: userAnswer,
        }),
      });
 
      if (!response.ok) {
        throw new Error("Erro ao gerar feedback.");
      }
 
      const data = await response.json();
      setFeedback(data.feedback);
 
      setSubmittedAnswers((prev) => [...prev, userAnswer]);
      setUserAnswer("");
 
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
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white overflow-auto">
        <div className="w-full max-w-3xl p-6 bg-gray-800 rounded-lg shadow-md mt-8">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Teste de Soft Skills
          </h1>
  
          {loading ? (
            <p className="text-center">Carregando...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : questions.length > 0 && currentQuestionIndex < questions.length ? (
            <div>
              <div className="mb-6 p-4 border border-gray-700 rounded-lg">
                <p className="text-xl font-semibold mb-4">{`Pergunta ${
                  currentQuestionIndex + 1
                }: ${questions[currentQuestionIndex].question}`}</p>
  
                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded mb-4"
                  rows={4}
                  placeholder="Escreva sua resposta aqui..."
                ></textarea>
              </div>
  
              <div className="text-center">
                <button
                  onClick={submitAnswer}
                  className="px-4 py-2 bg-green-500 text-white rounded"
                >
                  Enviar Resposta
                </button>
              </div>
  
              {feedback && (
                <div className="mt-6 p-4 bg-gray-700 text-white border border-gray-600 rounded-lg">
                  <strong>Feedback:</strong>
                  <p>{feedback}</p>
                </div>
              )}
            </div>
          ) : currentQuestionIndex >= questions.length ? (
            <div className="mt-6">
              <h2 className="text-xl font-bold mb-4">Resultado Final</h2>
              <ul className="space-y-4">
                {submittedAnswers.map((answer, idx) => (
                  <li
                    key={idx}
                    className="p-4 border border-gray-700 rounded-lg shadow-sm"
                  >
                    <p>
                      <strong>Pergunta {idx + 1}:</strong>{" "}
                      {questions[idx].question}
                    </p>
                    <p>
                      <strong>Sua Resposta:</strong> {answer}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

      
      <Link className="absolute top-5 left-5" href="/menu">
      <ArrowLeftCircle size={32} />
      </Link>  
      
    </div>

  );
}
   