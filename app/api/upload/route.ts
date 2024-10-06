import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // Receber o corpo da requisição (se necessário)
  const body = await request.json();
  console.log(body);

  // Simular a resposta com uma doença de tomate
  const response = {
    message: "Imagem recebida com sucesso.",
    diagnosis: "requeima",
    llm_output:
      "Seu tomateiro está com Requeima, uma doença fúngica que requer cuidados específicos. Para tratar essa doença, é importante seguir os seguintes passos:\n\n1. Remover as partes afetadas: Corte e descarte todas as folhas e frutos que apresentam sinais da doença para evitar a propagação do fungo.\n\n2. Aplicar fungicidas adequados: Utilize fungicidas à base de cobre ou outros recomendados para Requeima, seguindo sempre as instruções do rótulo e respeitando o período de carência.\n\n3. Melhorar a circulação de ar: Espaçe as plantas adequadamente e realize podas para aumentar a ventilação entre elas, reduzindo a umidade que favorece o fungo.\n\n4. Evitar molhar as folhas ao irrigar: Prefira a irrigação por gotejamento ou regue diretamente o solo, evitando a umidade nas folhas que facilita a infecção.\n\n5. Realizar rotação de culturas: Evite plantar tomateiros ou outras solanáceas no mesmo local por períodos consecutivos para diminuir a presença do fungo no solo.\n\n6. Monitoramento constante: Inspecione regularmente as plantas para detectar precocemente novos sinais da doença e agir rapidamente.\n\n7. Eliminar restos culturais: Após a colheita, remova e destrua todos os restos de plantas para reduzir a fonte de inóculo para a próxima safra.\n\nSeguindo esses cuidados, você aumentará as chances de controlar a Requeima e manter seu tomateiro saudável.",
  };

  // Retornar a resposta simulada
  return NextResponse.json(response, { status: 200 });
}
