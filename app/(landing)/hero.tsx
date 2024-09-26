import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function Hero() {
	return (
		<main className="bg-gradient-to-r from-primary-lighter to-primary-darker pt-20 pb-12 text-white">
			<div className="mx-auto flex max-w-screen-xl flex-col justify-between gap-8 px-4 md:flex-row md:items-center md:gap-0">
				<div className="flex flex-col gap-2">
					<h1 className="font-bold text-5xl leading-[3.6rem]">
						Tens medo de enfrentar
						<br /> ENTREVISTAS DE
						<br /> EMPREGO?
					</h1>
					<p className="font-medium text-accent text-lg">
						Descubra através de jogos como melhorar seu
						<br /> desempenho em entrevistas de emprego
					</p>
					<Link href = "/entrar">
					<button
						type="button"
						className="flex w-fit items-center gap-2 rounded-md bg-accent p-2 px-3 text-lg text-white"
					>
						Experimente gratuitamente <ArrowRight size={18} />
					</button>
					</Link>
				</div>
				<Image src="/full-logo.png" alt="Logo" width={388} height={388} />
			</div>
		</main>
	)
}
