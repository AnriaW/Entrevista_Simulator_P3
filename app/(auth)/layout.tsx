import { ArrowLeftCircle } from 'lucide-react'
import Link from 'next/link'

export default function AuthLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<main className="relative flex h-screen w-screen items-center justify-center bg-gradient-to-r from-primary-lighter to-primary-darker">
			<Link className="absolute top-5 left-5" href="/">
				<ArrowLeftCircle size={32} />
			</Link>
			{children}
		</main>
	)
}
