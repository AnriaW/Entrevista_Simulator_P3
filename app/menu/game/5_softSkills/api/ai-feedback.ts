// /pages/api/ai-feedback.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { question, answer } = req.body;

    // Simula um feedback gerado pela IA
    const feedback = `Sua resposta "${answer}" para a pergunta "${question}" foi interessante. Sugiro detalhar mais sobre exemplos específicos.`;

    res.status(200).json({ feedback });
  } else {
    res.status(405).json({ message: "Método não permitido" });
  }
}
