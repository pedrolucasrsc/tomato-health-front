import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // Receber o corpo da requisição (se necessário)
  const body = await request.json();
  console.log(body);

  // Simular a resposta com uma doença de tomate
  const response = {
    message: "Imagem recebida com sucesso.",
    diagnosis: "blabla",
  };

  // Retornar a resposta simulada
  return NextResponse.json(response, { status: 200 });
}
