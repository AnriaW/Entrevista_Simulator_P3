import React from "react";
import Link from "next/link"
import { ArrowLeftCircle } from 'lucide-react'

const UserProfile: React.FC = () => {
  return (
    <div className="bg-[#16192B] text-white h-screen w-screen flex justify-center items-center">
      <div className="flex flex-col gap-5 pb-16">
        {/* Informações do usuário */}
        <div className="flex w-full justify-center gap-5">
          {/* Imagem de perfil */}
          <div className="w-[450px] h-[400px] flex justify-center items-center bg-white text-black overflow-hidden rounded-md">
            <img src="caminho-da-imagem.jpg" alt="IMAGEM" className="max-w-full max-h-full object-cover" id="user-image" />
          </div>

          {/* Informações do perfil */}
          <div className="flex flex-col flex-grow relative">
            <p className="text-xl" id="professional-focus">Área de atuação</p>
            <p className="text-4xl font-bold" id="user-name">Username</p>
            <p id="user-status">status</p>
            <textarea
              id="user-description"
              className="w-[321px] h-[176px] rounded-lg p-2 resize-none"
              name="user-description"
            />
          </div>
        </div>

        {/* Últimas atividades */}
        <div className="w-full flex flex-col">
          <h2>Últimas entrevistas</h2>
          <ul id="activities" className="list-none p-0 m-0 flex gap-5">
            <li id="activitie1" className="h-[170px] w-[250px] bg-white rounded-lg text-black flex flex-col justify-center items-start p-3">
              <h2 id="id1">Área</h2>
              <p id="review1">Review</p>
              <p id="reviwer1">Reviewer name</p>
            </li>
            <li id="activitie2" className="h-[170px] w-[250px] bg-white rounded-lg text-black flex flex-col justify-center items-start p-3">
              <h2 id="id2">Área</h2>
              <p id="review2">Review</p>
              <p id="reviwer2">Reviewer name</p>
            </li>
            <li id="activitie3" className="h-[170px] w-[250px] bg-white rounded-lg text-black flex flex-col justify-center items-start p-3">
              <h2 id="id3">Área</h2>
              <p id="review3">Review</p>
              <p id="reviwer3">Reviewer name</p>
            </li>
          </ul>
        </div>

        <Link className="absolute top-5 left-5" href="/menu">
          <ArrowLeftCircle size={32} />
        </Link>
      </div>
    </div>
  );
}

export default UserProfile;