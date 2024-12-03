"use client";
import React from "react";
import Navbar  from './navbar'
import Footer  from './footer'
import TrainingProgress from './grafico'

export default function Page() {
    return (
        <>
        <Navbar />

        <div className="flex flex-col items-center">
   
            {/* Welcome Section */}
            <div className="w-full px-4 sm:px-10 py-10 bg-black/60 flex flex-col md:flex-row items-center gap-4">
                <div className="w-24 h-24 bg-[#7858C3] rounded-full" href="/perfil"></div>
                <div className="text-center md:text-left">
                    <h1 className="text-white text-2xl font-bold">Bem-vindo, usuário!</h1>
                    <div className="inline-block mt-2 px-2 py-1 bg-[#7858C3] rounded-sm text-xs text-black">Membro Premium</div>
                    <p className="text-white mt-4">Explore e melhore suas skills com mini-jogos divertidos.</p>
                </div>
            </div>

            {/* Soft skills */}
            <div className="flex-items-center px-4 sm:px-10 py-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-2" href="/menu/game/5_softSkills">
                <div className="p-4 bg-gradient-to-l from-green-800 to-green-400 rounded-lg shadow text-white max-w-[400px] mx-auto">
                    <h2 className="text-xl font-medium">Soft Skills</h2>
                    <p>Melhore comunicação, trabalho em equipe e muito mais.</p>
                    <a className="mt-4 flex gap-2" href="/menu/game/5_softSkills">
                        <span className="px-2 py-1 bg-[#7858C3] rounded text-sm">JOGAR</span>

                    </a>
                </div>


            {/* Hard skills */}
                <div className="p-4 bg-gradient-to-l from-green-800 to-green-400 rounded-lg shadow text-white max-w-[400px] mx-auto" href="/menu/game/4_gameHard">
                    <h2 className="text-xl font-medium">Hard Skills</h2>
                    <p>Melhore a sua proeficiência técnica nos assuntos mais recorrentes em entrevistas da sua área.</p>
                    <div className="mt-4 flex gap-2">
                        <span className="px-2 py-1 bg-[#7858C3] rounded text-sm">JOGAR</span>
                    </div>
                </div>

             </div>
                    
         </div>


        
        <TrainingProgress />

        <Footer />
     </>  
    );
}
