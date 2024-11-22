"use client";

import { useState } from "react";
import Link from "next/link";
import { generateQuestions } from "./prompt"; // Importando a função do arquivo prompt.ts

export default function GenerateQuestionsPage() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [answers, setAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0); // Controle do slide
  const [score, setScore] = useState(0); // Nota final

  const fetchQuestions = async () => {
    setLoading(true);
    setError("");
    setQuestions([]);
    setAnswers([]);
    setSubmitted(false);
    setScore(0);

    try {
      const data = await generateQuestions();
      setQuestions(data);
      setAnswers(new Array(data.length).fill(-1)); // Inicializa as respostas
    } catch (err: any) {
      setError(err.message || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (optionIdx: number) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = optionIdx;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    // Calcula a nota total
    let totalScore = 0;
    answers.forEach((answer, idx) => {
      if (questions[idx].options[answer] === questions[idx].correctAnswer) {
        totalScore += 20; // Cada resposta correta vale 20 pontos
      }
    });
    setScore(totalScore);
    setSubmitted(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
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

        {questions.length > 0 && !submitted && (
          <div className="mt-6">
            <div className="p-4 border border-gray-700 rounded-lg shadow-sm">
              <p className="font-bold mb-2">
                Pergunta {currentQuestion + 1}/{questions.length}:{" "}
                {questions[currentQuestion].question}
              </p>
              <ul>
                {questions[currentQuestion].options.map(
                  (option: string, optIdx: number) => (
                    <li key={optIdx} className="mb-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`question-${currentQuestion}`}
                          value={optIdx}
                          checked={answers[currentQuestion] === optIdx}
                          onChange={() => handleAnswerChange(optIdx)}
                        />
                        {option}
                      </label>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="flex justify-between mt-4">
              <button
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
                className="px-4 py-2 bg-gray-600 text-white rounded"
              >
                Anterior
              </button>
              {currentQuestion < questions.length - 1 ? (
                <button
                  onClick={nextQuestion}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Próximo
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-green-500 text-white rounded"
                >
                  Finalizar
                </button>
              )}
            </div>
          </div>
        )}

        {submitted && (
          <div className="mt-6 text-center">
            <h2 className="text-xl font-bold mb-4">Resultados</h2>
            <p className="text-lg mb-4">
              Sua pontuação final é: <strong>{score}/100</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
