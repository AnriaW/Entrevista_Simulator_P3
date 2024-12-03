// /pages/api/ai-feedback.ts
 
export async function POST(req: Request) {
  const body = await req.json();
  const { question, answer } = body;
 
  // Simula um feedback gerado pela IA
  const feedback = `Sua resposta "${answer}" para a pergunta "${question}" foi interessante. Sugiro detalhar mais sobre exemplos específicos.`;
 
  return new Response(JSON.stringify({ feedback }));
}