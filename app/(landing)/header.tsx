import Image from 'next/image'
import Link from 'next/link'
import { DesktopNav } from './desktop-nav'
import { MobileNav } from './mobile-nav'

export function Header() {
	return (
		<header className="sticky inset-0 w-full bg-gradient-to-r from-primary-lighter to-primary-darker px-4 py-6 text-white">
			<div className="mx-auto flex w-full max-w-screen-xl items-center justify-between">
				<Link href="/">
					<Image width={175} height={32} src="/typograph-logo.png" alt="Logo" />
				</Link>
				<DesktopNav />
				<MobileNav />
			</div>
		</header>
	)
}
