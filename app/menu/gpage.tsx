"use client"
import React from "react";
import Link from "next/link";
import Navbar from "./navbar";

export default function Page() {
    return (
        <>
        <Navbar />
        <div className="m-0 p-0 h-full w-full bg-[#16192B] flex flex-col overflow-auto">
            <div className="w-full h-[10px] mt-1"></div>

            {/* linha superior */}
            <div className="w-full h-[80%] flex flex-col items-center justify-center mt-3 mb-[60px] pt-[15px]">
                    <div className="text-white text-[35px] self-start pl-[17%]">Minijogos</div>

                    <div className="w-[80%] h-full flex flex-row justify-center mt-5">

                        {/* Bloco 1 */}
                        <div className="w-[40%] h-full flex flex-col items-start justify-center mr-[25px]">
                            <a className="w-full h-[300px] bg-[#6AB981] border-transparent rounded-[25px] flex items-center justify-center" href="/menu/game/5_softSkills">
                                <img
                                    src="/1436714.png"
                                    alt="SoftSkills Simulador"
                                    className="w-[40%] h-[80%] object-contain rounded-[20px]"
                                />
                            </a>
                            <div className="text-white text-[22px] mt-[10px] ml-[10px]">Simulador de perguntas de entrevista (SoftSkills)</div>
                        </div>

                        {/* Bloco 2 */}
                        <div className="w-[40%] h-full flex flex-col items-start justify-center mr-[25px]">
                            <a className="w-full h-[300px] bg-[#6AB981] border-transparent rounded-[25px] flex items-center justify-center" href="/menu/game/4_gameHard">
                                <img
                                    src="/5849fc74-a233-4d14-860f-23ff8c8859de.png"
                                    alt="HardSkills Simulador"
                                    className="w-[40%] h-[80%] object-contain rounded-[20px]"
                                />
                            </a>
                            <div className="text-white text-[22px] mt-[10px] ml-[10px]">Simulador de entrevista técnica (HardSkills)</div>
                        </div>

                    </div>
                </div>

                {/* linha inferior */}
                <div className="w-full h-[90%] flex flex-col items-center justify-center mt-2 mb-[60px] pt-[15px]">
                    <div className="text-white text-[35px] self-start pl-[17%]">Dicas de carreira</div>

                    <div className="w-[80%] h-full flex flex-row justify-center mt-5">
                        {/* Bloco 1 */}
                        <div className="w-[40%] h-full flex flex-col items-start justify-center mr-[25px]">
                            <a className="w-full h-[300px] bg-[#6AB981] border-transparent rounded-[25px]" href="/">
                                {/* Você pode adicionar uma imagem aqui, se necessário */}
                            </a>
                            <div className="text-white text-[22px] mt-[10px] ml-[10px]">Quais as roupas adequadas para utilizar numa entrevista de emprego?</div>
                        </div>

                        {/* Bloco 2 */}
                        <div className="w-[40%] h-full flex flex-col items-start justify-center mr-[25px]">
                            <a className="w-full h-[300px] bg-[#6AB981] border-transparent rounded-[25px]" href="/">
                                {/* Você pode adicionar uma imagem aqui, se necessário */}
                            </a>
                            <div className="text-white text-[22px] mt-[10px] ml-[10px]">Como se preparar para uma entrevista?</div>
                        </div>

                    </div>
                </div>

            </div> 

        </>
    
    );
}
