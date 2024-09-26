import { Clients } from './clients'
import { Hero } from './hero'
import { HowItWorks } from './how-it-works'
import React from 'react';

export default function Page() {
	return (
		<>
			<Hero />
			<HowItWorks />
			<Clients />
		</>
	)
}
