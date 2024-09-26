import { Footer } from './footer'
import { Header } from './header'

export default function LandingLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	)
}
