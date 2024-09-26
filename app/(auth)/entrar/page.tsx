'use client'
import Image from 'next/image'
import Link from 'next/link'

export default function Entrar() {
	return (
		<form className="flex h-full w-full flex-col items-center justify-center gap-8 bg-background md:h-fit md:w-fit md:flex-row md:justify-between md:rounded-2xl md:p-14">
			<div className="flex flex-col items-center gap-8 px-10">
				<Image
					src="/interview-man.png"
					width={165}
					height={257}
					alt="Interview Man"
				/>
				<h1 className="text-center font-bold text-4xl">
					Bem-vindo de
					<br />
					volta!
				</h1>
			</div>
			<div className="flex flex-col gap-5">
				<fieldset className="flex flex-col gap-2">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						placeholder="Email"
						className="w-80 rounded-md border border-white/15 bg-transparent p-2"
					/>
				</fieldset>
				<fieldset className="flex flex-col gap-2">
					<label htmlFor="password">Senha</label>
					<input
						type="password"
						placeholder="Senha"
						className="rounded-md border border-white/15 bg-transparent p-2"
					/>
				</fieldset>
				
				<Link href="/menu">
				<button className="mt-4 w-80 rounded-lg bg-accent/50 p-2 transition-colors hover:bg-accent"
				>
					Entrar
				</button>
				</Link>

				<Link href = "/recuperacaoSenha">   
				<button>Esqueceu a senha?</button>  
				</Link>
			</div>
		</form>
		
	)
}
