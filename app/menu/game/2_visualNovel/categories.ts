export type Categories = {
    [key: string]: string[]; // Permite que qualquer chave de string tenha um valor de array de strings
};

export const categories: Categories = {
    'Comportamental': [
        "O que você procura no seu próximo emprego?", "Como você descreveria seu estilo de trabalho?", "Quais são seus objetivos de carreira para os próximos cinco anos?", "Conte-me sobre uma ocasião em que você teve que desenvolver uma nova habilidade. Como você abordou o processo de aprendizagem?", "Por favor, compartilhe uma ocasião em que você estabeleceu uma meta para si mesmo e a atingiu. Como você fez isso?", "Descreva uma situação em que você discordou de alguém no trabalho. O que você fez e qual foi o resultado?", "Por favor, conte-me sobre alguns dos seus pontos fortes e fracos.", "Conte-me sobre uma ocasião em que você entregou resultados apesar de um ambiente ou contexto desafiador. Qual era a situação, qual era sua meta e quais foram os resultados?", "Conte-me sobre uma ocasião em que você teve que entregar várias prioridades concorrentes. O que você fez e quais foram os resultados?", "Conte-me sobre uma ocasião em que você teve que agir rapidamente, mas não tinha muitos dados para informar sua decisão. O que você fez e qual foi o resultado?", "Conte-me sobre uma ocasião em que você cometeu um erro. Como você comunicou esse erro?", "Por favor, diga-me por que você seria uma boa opção para essa função.", "Quando você tenta superar e resolver um problema sozinho e quando envolve outras pessoas da sua equipe?"
    ],

    'Técnica' : [
        "Imagine que você está trabalhando em um aplicativo. Como você usaria a declaração de missão da empresa para definir a proposta de valor do aplicativo?", "Como você decide se deve usar designs de baixa ou alta fidelidade?", "Qual é o valor da arquitetura da informação no design de UX?", "Imagine que você está trabalhando em um aplicativo. Como você trabalharia para evitar viés implícito em seus designs?", "O que são padrões de design enganosos e como evitá-los em seus designs?", "Quais são algumas coisas práticas que você pode fazer para garantir a privacidade dos dados coletados durante a pesquisa do usuário?", "Conte-me sobre uma ocasião em que você teve que agir rapidamente, mas não tinha muitos dados para informar sua decisão. O que você fez e qual foi o resultado?", "Imagine que você está trabalhando no redesenho do site de um cliente. Conte-me sobre como você começaria com esse projeto.", "Quais são algumas considerações de design quando você precisa projetar para múltiplas plataformas, como iOS e Android?", "Como você decide para qual tamanho começar a projetar e como dimensionar seu design para diferentes tamanhos de tela?", "Quais são algumas das principais diferenças entre o design de aplicativos móveis nativos e o design web responsivo?", "Conte-me sobre uma ocasião em que um mapa da jornada do usuário foi útil e por quê."
    ],

    'Situacional' : [ "Você está liderando um projeto com risco de atraso. O que faria para garantir a entrega no prazo?",
        "Um cliente está insatisfeito com o progresso do projeto. Como resolveria a situação?",
        "Um colega de equipe está com dificuldades sob pressão. O que você faria para ajudar?",
        "Houve uma falha de comunicação em sua equipe remota. Como você resolveria isso?",
        "Você recebeu duas tarefas urgentes com prazos curtos. Como organizaria seu tempo?",
        "Sua equipe está resistente a uma mudança importante. Como você os convenceria?",
        "Os requisitos de um projeto mudaram no meio do desenvolvimento. Como você reagiria?",
        "Um cliente exige mudanças fora do escopo original. Como negociaria a situação?",
        "Você identificou um erro grave perto da entrega. O que faria para corrigi-lo?",
        "Há falta de alinhamento entre equipes em um projeto. Como garantiria a colaboração?" ]

   
};

export const categoriesKeys: string[] = Object.keys(categories);