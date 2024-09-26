import Link from 'next/link'
import {
	SiLinkedin,
	SiX,
	SiInstagram,
	SiYoutube,
} from '@icons-pack/react-simple-icons'

//TODO: add real urls

export function Footer() {
	return (
		<footer className="w-full border-white/65 border-t px-4 py-8">
			<nav className="mx-auto flex w-full max-w-screen-xl gap-4">
				<Link href="#">
					<SiX />
				</Link>
				<Link href="#">
					<SiInstagram />
				</Link>
				<Link href="#">
					<SiYoutube />
				</Link>
				<Link href="#">
					<SiLinkedin />
				</Link>
			</nav>
		</footer>
	)
}
