"use client";

import { useState } from "react";
import Link from "next/link";

export default function GenerateQuestionsPage() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [answers, setAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const fetchQuestions = async () => {
    setLoading(true);
    setError("");
    setQuestions([]);
    setAnswers([]);
    setSubmitted(false);

    try {
      const response = await fetch("/hardSkillsQuestions.json");
      if (!response.ok) {
        throw new Error("Erro ao buscar perguntas");
      }
      const data = await response.json();
      setQuestions(data);
      setAnswers(new Array(data.length).fill(-1));
    } catch (err: any) {
      setError(err.message || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionIdx: number, optionIdx: number) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIdx] = optionIdx;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white overflow-auto">
      <div className="w-full max-w-3xl p-6 bg-gray-800 rounded-lg shadow-md mt-8">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Questionário de HardSkills
        </h1>

        <div className="flex justify-between mb-6">
          <button
            onClick={fetchQuestions}
            className="px-4 py-2 bg-blue-500 text-white rounded"
            disabled={loading}
          >
            {loading ? "Carregando..." : "Carregar Perguntas"}
          </button>
          <Link
            href="/menu"
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Voltar
          </Link>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {questions.length > 0 && (
          <form onSubmit={(e) => e.preventDefault()} className="mt-6">
            <div className="space-y-6">
              {questions.map((q, idx) => (
                <div
                  key={idx}
                  className="p-4 border border-gray-700 rounded-lg shadow-sm"
                >
                  <p className="font-bold mb-2">{`Pergunta ${idx + 1}: ${q.question}`}</p>
                  <ul>
                    {q.options.map((option: string, optIdx: number) => (
                      <li key={optIdx} className="mb-2">
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={`question-${idx}`}
                            value={optIdx}
                            checked={answers[idx] === optIdx}
                            onChange={() => handleAnswerChange(idx, optIdx)}
                            disabled={submitted}
                          />
                          {option}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {!submitted && (
              <div className="text-center mt-6">
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-green-500 text-white rounded"
                >
                  Enviar Respostas
                </button>
              </div>
            )}
          </form>
        )}

        {submitted && (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Resultados</h2>
            <ul className="space-y-4">
              {questions.map((q, idx) => (
                <li
                  key={idx}
                  className="p-4 border border-gray-700 rounded-lg shadow-sm"
                >
                  <p>
                    <strong>Pergunta {idx + 1}:</strong> {q.question}
                  </p>
                  <p>
                    <strong>Sua Resposta:</strong>{" "}
                    {answers[idx] !== -1
                      ? q.options[answers[idx]]
                      : "Não respondida"}
                  </p>
                  <p>
                    <strong>Resposta Correta:</strong> {q.correctAnswer}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}