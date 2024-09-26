"use client";

import React, { useState, useEffect } from "react";
import "./game.css"; // Importa o arquivo CSS
import getQuestions from "./randomizeQuestions";
import Link from "next/link";
import { ArrowLeftCircle } from 'lucide-react'

export default function Game() {
  // Estado para gerenciar perguntas, respostas e índice atual
  const [index, setIndex] = useState<number>(0);
  const [questions] = useState<string[]>(getQuestions(5));
  const [responses, setResponses] = useState<string[]>(new Array(5).fill(""));
  const [currentQuestion, setCurrentQuestion] = useState<string>("");

  useEffect(() => {
    // Atualiza a pergunta atual quando o índice mudar
    setCurrentQuestion(questions[index].replace(/\n/g, "<br>"));
  }, [index, questions]);

  const saveResponse = () => {
    const textInput = (document.getElementById("textInput") as HTMLTextAreaElement).value; // Faz o cast para HTMLTextAreaElement
    const updatedResponses = responses; // Cria uma cópia do estado
    updatedResponses[index] = textInput;
    setResponses(updatedResponses);
  };

  function redirectToDashboard() {
    window.location.href = "/menu/game/3_dashboard"
  }

  // Função para atualizar o índice e pergunta
  const updateGame = () => {
    if (index < 5) {
      saveResponse();
      clearTextArea();
      if (index < 4) {
        setIndex(index + 1);
      } else {
        console.log(responses);
        // alert("Redirecionar a partir daqui");
        redirectToDashboard();
      }
    }
  };

  const clearTextArea = () => {
    const textInput = document.getElementById("textInput") as HTMLTextAreaElement;
    if (textInput) {
      textInput.value = ""; // Limpa o campo de texto
    }
  };

  const updateNextButtonText = () => {
    return index === 4 ? "Finalizar" : "Próxima pergunta";
  };

  return (
    <div>
      <div className="backgroundImage"></div>

      {/* Caixa de pergunta */}
      <div className="questionBox" dangerouslySetInnerHTML={{ __html: currentQuestion }} />

      {/* Caixa de entrada de texto */}
      <div className="container" id="textContainer">
        <textarea
          id="textInput"
          placeholder="Digite aqui sua resposta."
        ></textarea>
        <button
          id="nextQuestionButton"
          className="pos_next buttonPrimary"
          onClick={updateGame}
        >
          {updateNextButtonText()}
        </button>
      </div>

      <Link className="absolute top-5 left-5" href="./1_areaSelection">
				<ArrowLeftCircle size={32} />
			</Link>
    </div>
  );
};