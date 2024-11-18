"use client";


import { useState } from "react";

 

export default function GenerateQuestionsPage() {
    const [questions, setQuestions] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
  
    const fetchQuestions = async () => {
      setLoading(true);
      setError("");
      setQuestions([]);
  
      try {
        const response = await fetch("/hardSkillsQuestions.json");
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
  
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Gerar Perguntas</h1>
        <button
          onClick={fetchQuestions}
          className="px-4 py-2 bg-blue-500 text-white rounded"
          disabled={loading}
        >
          {loading ? "Carregando..." : "Gerar Perguntas"}
        </button>
  
        {error && <p className="text-red-500 mt-4">{error}</p>}
  
        <ul className="mt-6">
          {questions.map((q, idx) => (
            <li key={idx} className="mb-4 border-b pb-2">
              <strong>Pergunta {idx + 1}:</strong> {q.question}
              <ul className="mt-2">
                {q.options?.map((opt: string, optIdx: number) => (
                  <li key={optIdx} className="ml-4">
                    - {opt}
                  </li>
                ))}
              </ul>
              <p>
                <strong>Resposta Correta:</strong> {q.correctAnswer}
              </p>
            </li>
          ))}
        </ul>
      </div>
    );
  }