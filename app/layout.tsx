import React from 'react'
import { Ubuntu } from 'next/font/google'
import './globals.css'

const ubuntu = Ubuntu({
	subsets: ['latin'],
	weight: ['300', '400', '500', '700'],
})

export const metadata = {
	title: 'Entrevista Simulator',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="pt-BR">
			<body 
			className={`${ubuntu.className} bg-background text-white`}
			>
				{children}
			</body>
		</html>
	)
}
