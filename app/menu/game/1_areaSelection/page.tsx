import React from "react";
import Link from "next/link"
import { ArrowLeftCircle } from 'lucide-react'
import "./areaSelection.css";

export default function Page() {
	return (
        <div>
            <div className="tittleBox">Escolha a Área da Entrevista</div>

            <div className="optionBox">
                <Link href="/menu/game/2_visualNovel" className="optionButton">Front-end</Link>
                <Link href="/menu/game/2_visualNovel"className="optionButton">Back-end</Link>
                <Link href="/menu/game/2_visualNovel"className="optionButton">Full-stack</Link>
                <Link href="/#"className="optionButton">Em breve</Link>
            </div>

            <Link className="absolute top-5 left-5" href="/menu">
				<ArrowLeftCircle size={32} />
			</Link>
        </div>
    );
}