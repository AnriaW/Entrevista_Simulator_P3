export function Clients() {
	return (
		<section className="mx-auto flex w-full max-w-screen-xl flex-col gap-4 px-4 py-24 text-center">
			<h3 className="font-bold text-4xl">O que nossos clientes dizem?</h3>
			<p className="opacity-50">
				Veja feedbacks de pessoas reais após assinarem nosso serviço
			</p>
			<div className="mt-8 flex flex-wrap justify-center gap-4">
				<Card
					name="João"
					job="Desenvolvedor Frontend"
					feedback='"O Entrevista Simulator foi essencial para eu me preparar para entrevistas técnicas. O modo Online Judge me ajudou a praticar com problemas reais de código, enquanto o feedback da IA me mostrou exatamente onde melhorar."'
				/>
				<Card
					name="Maria"
					job="Desenvolvedora Backend"
					feedback='"A experiência no simulador me fez sentir como se estivesse em uma entrevista real. Receber dicas personalizadas e poder refazer minhas respostas fez toda a diferença na minha confiança. Recomendo para qualquer um que queira se destacar!"'
				/>
				<Card
					name="José"
					job="Desenvolvedor Fullstack"
					feedback='"O simulador técnico não só me ajudou a revisar conceitos de front e back-end. O feedback detalhado foi um divisor de águas na minha preparação!"'
				/>
			</div>
		</section>
	)
}

const Card = ({
	name,
	job,
	feedback,
}: {
	name: string
	job: string
	feedback: string
}) => (
	<div className="flex h-[394px] w-[312px] flex-col flex-wrap gap-2 rounded-xl bg-primary-lighter p-4 py-8">
		<p className="font-light text-black text-lg">{feedback}</p>
		<span className="mt-auto">
			<p className="font-light text-lg text-white">{job}</p>
			<p className="font-bold text-lg text-white">{name}</p>
		</span>
	</div>
)
