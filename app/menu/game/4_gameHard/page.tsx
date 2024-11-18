"use client";

import { useState } from "react";

export default function GenerateQuestionsPage() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [answers, setAnswers] = useState<number[]>([]); // Armazena as respostas escolhidas
  const [submitted, setSubmitted] = useState(false); // Indica se o formulário foi enviado

  const fetchQuestions = async () => {
    setLoading(true);
    setError("");
    setQuestions([]);
    setAnswers([]); // Reinicia as respostas
    setSubmitted(false);

    try {
      const response = await fetch("/hardSkillsQuestions.json");
      if (!response.ok) {
        throw new Error("Erro ao buscar perguntas");
      }
      const data = await response.json();
      setQuestions(data);
      setAnswers(new Array(data.length).fill(-1)); // Inicializa respostas como "não respondido"
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Questionário de HardSkills</h1>
      <button
        onClick={fetchQuestions}
        className="px-4 py-2 bg-blue-500 text-white rounded"
        disabled={loading}
      >
        {loading ? "Carregando..." : "Carregar Perguntas"}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {questions.length > 0 && (
        <form onSubmit={(e) => e.preventDefault()} className="mt-6">
          {questions.map((q, idx) => (
            <div key={idx} className="mb-6">
              <p className="font-bold">{`Pergunta ${idx + 1}: ${q.question}`}</p>
              <ul>
                {q.options.map((option: string, optIdx: number) => (
                  <li key={optIdx}>
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
          {!submitted && (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Enviar Respostas
            </button>
          )}
        </form>
      )}

      {submitted && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Resultados</h2>
          <ul>
            {questions.map((q, idx) => (
              <li key={idx} className="mb-4">
                <p>
                  <strong>Pergunta {idx + 1}:</strong> {q.question}
                </p>
                <p>
                  <strong>Sua Resposta:</strong>{" "}
                  {answers[idx] !== -1 ? q.options[answers[idx]] : "Não respondida"}
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
  );
}
