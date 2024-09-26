import Link from 'next/link'

export function DesktopNav() {
	return (
		<nav className="hidden md:block">
			<ul className="flex gap-4 font-light">
				<li>
					<Link href="/#">Preços</Link>
				</li>
				<li>
					<Link href="/#">Como Funciona</Link>
				</li>
				<li>
					<Link href="/#">Feedbacks</Link>
				</li>
				<li className="mr-4">
					<Link href="/#">Sobre</Link>
				</li>
				<li>
					<Link href="/entrar" className="rounded-md bg-background p-2 px-3">
						Entrar
					</Link>
				</li>
				<li>
					<Link href="/registrar" className="rounded-md bg-accent p-2 px-3">
						Registrar-se
					</Link>
				</li>
			</ul>
		</nav>
	)
}
