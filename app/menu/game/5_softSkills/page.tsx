"use client";

import { ArrowLeftCircle } from 'lucide-react'
import Link from "next/link";
import { useState, useEffect } from "react";

export default function GenerateQuestionsPage() {
  const [questions, setQuestions] = useState<string[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [answer, setAnswer] = useState<string>("");  
  const [loading, setLoading] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Carregar perguntas ao montar o componente
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/prompt"); // Para GET
        const data = await response.json();
        setQuestions(data.questions);
      } catch (error) {
        console.error("Erro ao carregar perguntas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Sortear 5 perguntas aleatórias
  useEffect(() => {
    if (questions.length > 0) {
      const shuffled = [...questions].sort(() => Math.random() - 0.5); // Embaralhar perguntas
      setSelectedQuestions(shuffled.slice(0, 5)); // Selecionar 5 perguntas
    }
  }, [questions]);

  const handleAnswerSubmit = () => {
    if (!answer) return;

    const updatedAnswers = [...answers, answer];
    setAnswers(updatedAnswers);
    setAnswer("");

    if (updatedAnswers.length < 5) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Enviar as respostas para gerar feedback
      generateFeedback(updatedAnswers);
    }
  };

  const generateFeedback = async (answers: string[]) => {
    setLoading(true);
    try {
const response = await fetch("/api/prompt", { // Para POST
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers, questions: selectedQuestions }),
      });
      const data = await response.json();
      setFeedback(data.feedback);
    } catch (error) {
      console.error("Erro ao gerar feedback:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" p-4 text-center"> {/* Centralizar todo o conteúdo */}
      <h1 className="text-2xl font-bold mb-4">Jogo de Soft Skills</h1>
  
      {loading && <p>Carregando...</p>}
  
      {!loading && feedback && (
        <div>
          <h2 className="text-xl font-bold">Feedback:</h2>
          <p>{feedback}</p>
        </div>
      )}
  
      {!loading && !feedback && currentQuestionIndex < 5 && (
        <div className=" grid h-screen flex items-center justify-center space-y-4">
          <p className="text-lg text-center max-w-[400px]">{selectedQuestions[currentQuestionIndex]}</p> {/* Adicionada margem inferior */}
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            style={{ color: "white", backgroundColor: "#1f2937" }} // Branco para texto e cinza escuro para fundo
            className=" p-4 border w-full max-w-[400px] h-16  rounded-md" // Alterado tamanho e estilo
            placeholder="Sua resposta..."
          />
  
          <button
            onClick={handleAnswerSubmit}
            className=" py-3 mt-8 bg-[#7858C3] text-white rounded-lg"
          >
            {currentQuestionIndex < 4 ? "Próxima Pergunta" : "Gerar Feedback"}
          </button>
        </div>
      )}
  
      {currentQuestionIndex >= 5 && <p>fim</p>}

      <Link className="absolute top-5 left-5" href="/menu">
          <ArrowLeftCircle size={32} />
        </Link>
    </div>
  );
  
}