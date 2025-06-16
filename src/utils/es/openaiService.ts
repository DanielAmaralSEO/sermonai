
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

// Simulación del servicio OpenAI para demostración
// En la implementación real, necesitarías configurar tu clave de API de OpenAI
export const generateSermon = async (request: SermonRequest): Promise<SermonResponse> => {
  // Simulando delay de la API
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  console.log('Generando sermón para:', request);
  
  // Esta es una respuesta simulada para demostración
  // En la implementación real, harías una llamada a la API de OpenAI
  return {
    introduction: `El libro de ${request.book} nos trae enseñanzas profundas sobre la naturaleza de Dios y nuestra relación con Él. ${request.chapter ? `En el capítulo ${request.chapter},` : ''} encontramos un pasaje que nos invita a la reflexión sobre ${request.theme || 'nuestro camino espiritual'}. Este texto bíblico, escrito en un contexto histórico específico, continúa siendo relevante para nuestras vidas hoy, ofreciendo sabiduría eterna para los desafíos contemporáneos.`,
    
    keyVerse: {
      text: `"Porque yo sé los planes que tengo para ustedes", declara el Señor, "planes de hacerlos prosperar y no de causar daño, planes de darles esperanza y un futuro."`,
      reference: `${request.book} ${request.chapter}${request.verses ? `:${request.verses}` : ''}`
    },
    
    mainMessage: {
      title: `${request.theme || 'La Fidelidad de Dios'} en ${request.book}`,
      points: [
        `Primer punto: La naturaleza revelada de Dios en ${request.book} nos muestra Su fidelidad constante a través de la historia.`,
        `Segundo punto: Las promesas bíblicas son atemporales y se aplican a nuestras circunstancias actuales, ofreciendo dirección y consuelo.`,
        `Tercer punto: Nuestra respuesta debe ser de fe activa, confiando en el carácter inmutable de Dios aun en medio de las incertidumbres.`
      ]
    },
    
    practicalApplications: [
      "Comienza cada día recordando las promesas de Dios y medita en ellas durante momentos de desafío.",
      "Mantén un diario de oración, registrando cómo Dios ha sido fiel en tu vida personal.",
      "Comparte testimonios de fidelidad divina con otros miembros de la comunidad cristiana.",
      "Practica la gratitud diaria, reconociendo las bendiciones pequeñas y grandes que recibimos."
    ],
    
    conclusion: `Concluyendo, el texto de ${request.book} nos recuerda que, independientemente de las circunstancias que enfrentamos, Dios permanece fiel a Sus propósitos. ${request.theme ? `A través del tema de ${request.theme.toLowerCase()},` : ''} somos llamados a vivir con esperanza y confianza, sabiendo que nuestra vida está en las manos de Aquel que es eternamente confiable. Que podamos salir de aquí hoy con corazones renovados y fe fortalecida, listos para enfrentar cada desafío con la certeza de que no estamos solos.`,
    
    memorablePoints: [
      `Dios tiene planes específicos para cada uno de nosotros`,
      `La fidelidad divina no depende de nuestras circunstancias`,
      `Nuestra esperanza está fundamentada en el carácter inmutable de Dios`
    ],
    
    illustrations: [
      "Como un maestro constructor que no abandona su obra hasta verla completa, Dios no abandona el trabajo que comenzó en nosotros.",
      "Así como una brújula siempre apunta hacia el norte magnético, la Palabra de Dios siempre nos dirige hacia Su voluntad perfecta.",
      "Un padre amoroso puede permitir que su hijo enfrente desafíos para crecer, pero nunca lo abandona en el proceso - así es el amor de Dios por nosotros."
    ]
  };
};

// Función para integración real con OpenAI (a ser implementada)
export const generateSermonWithOpenAI = async (request: SermonRequest, apiKey: string): Promise<SermonResponse> => {
  const prompt = `
    Crea un sermón estructurado basado en:
    - Libro: ${request.book}
    - Capítulo: ${request.chapter}
    ${request.verses ? `- Versículos: ${request.verses}` : ''}
    ${request.theme ? `- Tema central: ${request.theme}` : ''}
    
    El sermón debe tener:
    1. Introducción contextualizando el libro/capítulo
    2. Versículo clave con referencia
    3. Mensaje principal con 3 puntos
    4. Aplicaciones prácticas (4 elementos)
    5. Conclusión impactante
    6. 3 puntos para memorización
    7. 3 ilustraciones/analogías
    
    Responde en español, con lenguaje accesible pero respetuoso.
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
            content: 'Eres un asistente especializado en crear sermones bíblicos estructurados, respetuosos y aplicables a la vida práctica. Usa lenguaje claro y accesible.'
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
      throw new Error('Error en la comunicación con OpenAI');
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Aquí necesitarías implementar el parsing del contenido retornado
    // para estructurarlo en el formato SermonResponse
    console.log('OpenAI Response:', content);
    
    // Por ahora, retorna la respuesta simulada
    return generateSermon(request);
    
  } catch (error) {
    console.error('Error al generar sermón:', error);
    throw error;
  }
};
