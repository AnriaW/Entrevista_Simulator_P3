"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeftCircle } from 'lucide-react'

export default function Game() {
  return (
    
    <div className="Estatisticas w-full h-screen bg-[#16192a] flex justify-center items-center">
        
        <div>
          <Link className="absolute top-5 left-5" href="./1_areaSelection">
            <ArrowLeftCircle size={32} />
          </Link>
        </div>
    

        <div className="Group9 w-full max-w-[903px] h-auto p-5 bg-[#6ab981] rounded-[25px] relative flex flex-col items-center">
        
            <div className="VejaComoEstOSeuDomNioSobrePerguntas text-center text-[#16192a] text-3xl font-bold mb-8">
                Veja como está o seu domínio sobre perguntas
            </div>
            <div className="w-full space-y-8">
                <div className="flex justify-between items-center">
                    <div className="text-black text-2xl font-bold">Situacionais</div>
                    <div className="flex-1 mx-4 border-t-2 border-[#16192a]"></div>
                    <div className="text-black text-2xl font-bold">75%</div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="text-black text-2xl font-bold">Técnicas</div>
                    <div className="flex-1 mx-4 border-t-2 border-[#16192a]"></div>
                    <div className="text-black text-2xl font-bold">75%</div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="text-black text-2xl font-bold">Comportamentais</div>
                    <div className="flex-1 mx-4 border-t-2 border-[#16192a]"></div>
                    <div className="text-black text-2xl font-bold">23%</div>
                </div>
            </div>
            
        </div>
        
    </div>
  );
}
