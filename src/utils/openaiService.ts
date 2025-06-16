
export interface SermonRequest {
  book: string;
  chapter: string;
  verses?: string;
  theme?: string;
}

export interface SermonResponse {
  introduction: string;
  keyVerse: {
    text: string;
    reference: string;
  };
  mainMessage: {
    title: string;
    points: string[];
  };
  practicalApplications: string[];
  conclusion: string;
  memorablePoints: string[];
  illustrations: string[];
}

// Simulação do serviço OpenAI para demonstração
// Na implementação real, você precisará configurar sua chave da API OpenAI
export const generateSermon = async (request: SermonRequest): Promise<SermonResponse> => {
  // Simulando delay da API
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  console.log('Generating sermon for:', request);
  
  // Esta é uma resposta simulada para demonstração
  // Na implementação real, você faria uma chamada para a API OpenAI
  return {
    introduction: `O livro de ${request.book} nos traz ensinamentos profundos sobre a natureza de Deus e nossa relação com Ele. ${request.chapter ? `No capítulo ${request.chapter},` : ''} encontramos uma passagem que nos convida à reflexão sobre ${request.theme || 'nossa jornada espiritual'}. Este texto bíblico, escrito em um contexto histórico específico, continua relevante para nossas vidas hoje, oferecendo sabedoria eterna para os desafios contemporâneos.`,
    
    keyVerse: {
      text: `"Porque eu sei os planos que tenho para vocês", declara o Senhor, "planos de fazê-los prosperar e não de causar dano, planos de dar a vocês esperança e um futuro."`,
      reference: `${request.book} ${request.chapter}${request.verses ? `:${request.verses}` : ''}`
    },
    
    mainMessage: {
      title: `${request.theme || 'A Fidelidade de Deus'} em ${request.book}`,
      points: [
        `Primeiro ponto: A natureza revelada de Deus em ${request.book} nos mostra Sua fidelidade constante através da história.`,
        `Segundo ponto: As promessas bíblicas são atemporais e se aplicam às nossas circunstâncias atuais, oferecendo direção e conforto.`,
        `Terceiro ponto: Nossa resposta deve ser de fé ativa, confiando no caráter imutável de Deus mesmo em meio às incertezas.`
      ]
    },
    
    practicalApplications: [
      "Comece cada dia lembrando-se das promessas de Deus e medite nelas durante momentos de desafio.",
      "Mantenha um diário de oração, registrando como Deus tem sido fiel em sua vida pessoal.",
      "Compartilhe testemunhos de fidelidade divina com outros membros da comunidade cristã.",
      "Pratique a gratidão diária, reconhecendo as bênçãos pequenas e grandes que recebemos."
    ],
    
    conclusion: `Concluindo, o texto de ${request.book} nos lembra que, independentemente das circunstâncias que enfrentamos, Deus permanece fiel aos Seus propósitos. ${request.theme ? `Através do tema de ${request.theme.toLowerCase()},` : ''} somos chamados a viver com esperança e confiança, sabendo que nossa vida está nas mãos dAquele que é eternamente confiável. Que possamos sair daqui hoje com corações renovados e fé fortalecida, prontos para enfrentar cada desafio com a certeza de que não estamos sozinhos.`,
    
    memorablePoints: [
      `Deus tem planos específicos para cada um de nós`,
      `A fidelidade divina não depende das nossas circunstâncias`,
      `Nossa esperança está fundamentada no caráter imutável de Deus`
    ],
    
    illustrations: [
      "Como um mestre construtor que não abandona sua obra até vê-la completa, Deus não abandona o trabalho que começou em nós.",
      "Assim como uma bússola sempre aponta para o norte magnético, a Palavra de Deus sempre nos direciona para Sua vontade perfeita.",
      "Um pai amoroso pode permitir que seu filho enfrente desafios para crescer, mas nunca o abandona no processo - assim é o amor de Deus por nós."
    ]
  };
};

// Função para integração real com OpenAI (a ser implementada)
export const generateSermonWithOpenAI = async (request: SermonRequest, apiKey: string): Promise<SermonResponse> => {
  const prompt = `
    Crie uma pregação estruturada baseada em:
    - Livro: ${request.book}
    - Capítulo: ${request.chapter}
    ${request.verses ? `- Versículos: ${request.verses}` : ''}
    ${request.theme ? `- Tema central: ${request.theme}` : ''}
    
    A pregação deve ter:
    1. Introdução contextualizando o livro/capítulo
    2. Versículo-chave com referência
    3. Mensagem principal com 3 pontos
    4. Aplicações práticas (4 itens)
    5. Conclusão impactante
    6. 3 pontos para memorização
    7. 3 ilustrações/analogias
    
    Responda em português brasileiro, com linguagem acessível mas respeitosa.
  `;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'Você é um assistente especializado em criar pregações bíblicas estruturadas, respeitosas e aplicáveis à vida prática. Use linguagem clara e acessível.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      }),
    });

    if (!response.ok) {
      throw new Error('Erro na comunicação com OpenAI');
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Aqui você precisaria implementar o parsing do conteúdo retornado
    // para estruturar no formato SermonResponse
    console.log('OpenAI Response:', content);
    
    // Por agora, retorna a resposta simulada
    return generateSermon(request);
    
  } catch (error) {
    console.error('Erro ao gerar pregação:', error);
    throw error;
  }
};
