
export const booksOfBible = [
  // Antigo Testamento
  { name: "Gênesis", chapters: 50, testament: "antigo" },
  { name: "Êxodo", chapters: 40, testament: "antigo" },
  { name: "Levítico", chapters: 27, testament: "antigo" },
  { name: "Números", chapters: 36, testament: "antigo" },
  { name: "Deuteronômio", chapters: 34, testament: "antigo" },
  { name: "Josué", chapters: 24, testament: "antigo" },
  { name: "Juízes", chapters: 21, testament: "antigo" },
  { name: "Rute", chapters: 4, testament: "antigo" },
  { name: "1 Samuel", chapters: 31, testament: "antigo" },
  { name: "2 Samuel", chapters: 24, testament: "antigo" },
  { name: "1 Reis", chapters: 22, testament: "antigo" },
  { name: "2 Reis", chapters: 25, testament: "antigo" },
  { name: "1 Crônicas", chapters: 29, testament: "antigo" },
  { name: "2 Crônicas", chapters: 36, testament: "antigo" },
  { name: "Esdras", chapters: 10, testament: "antigo" },
  { name: "Neemias", chapters: 13, testament: "antigo" },
  { name: "Ester", chapters: 10, testament: "antigo" },
  { name: "Jó", chapters: 42, testament: "antigo" },
  { name: "Salmos", chapters: 150, testament: "antigo" },
  { name: "Provérbios", chapters: 31, testament: "antigo" },
  { name: "Eclesiastes", chapters: 12, testament: "antigo" },
  { name: "Cantares", chapters: 8, testament: "antigo" },
  { name: "Isaías", chapters: 66, testament: "antigo" },
  { name: "Jeremias", chapters: 52, testament: "antigo" },
  { name: "Lamentações", chapters: 5, testament: "antigo" },
  { name: "Ezequiel", chapters: 48, testament: "antigo" },
  { name: "Daniel", chapters: 12, testament: "antigo" },
  { name: "Oséias", chapters: 14, testament: "antigo" },
  { name: "Joel", chapters: 3, testament: "antigo" },
  { name: "Amós", chapters: 9, testament: "antigo" },
  { name: "Obadias", chapters: 1, testament: "antigo" },
  { name: "Jonas", chapters: 4, testament: "antigo" },
  { name: "Miquéias", chapters: 7, testament: "antigo" },
  { name: "Naum", chapters: 3, testament: "antigo" },
  { name: "Habacuque", chapters: 3, testament: "antigo" },
  { name: "Sofonias", chapters: 3, testament: "antigo" },
  { name: "Ageu", chapters: 2, testament: "antigo" },
  { name: "Zacarias", chapters: 14, testament: "antigo" },
  { name: "Malaquias", chapters: 4, testament: "antigo" },

  // Novo Testamento
  { name: "Mateus", chapters: 28, testament: "novo" },
  { name: "Marcos", chapters: 16, testament: "novo" },
  { name: "Lucas", chapters: 24, testament: "novo" },
  { name: "João", chapters: 21, testament: "novo" },
  { name: "Atos", chapters: 28, testament: "novo" },
  { name: "Romanos", chapters: 16, testament: "novo" },
  { name: "1 Coríntios", chapters: 16, testament: "novo" },
  { name: "2 Coríntios", chapters: 13, testament: "novo" },
  { name: "Gálatas", chapters: 6, testament: "novo" },
  { name: "Efésios", chapters: 6, testament: "novo" },
  { name: "Filipenses", chapters: 4, testament: "novo" },
  { name: "Colossenses", chapters: 4, testament: "novo" },
  { name: "1 Tessalonicenses", chapters: 5, testament: "novo" },
  { name: "2 Tessalonicenses", chapters: 3, testament: "novo" },
  { name: "1 Timóteo", chapters: 6, testament: "novo" },
  { name: "2 Timóteo", chapters: 4, testament: "novo" },
  { name: "Tito", chapters: 3, testament: "novo" },
  { name: "Filemom", chapters: 1, testament: "novo" },
  { name: "Hebreus", chapters: 13, testament: "novo" },
  { name: "Tiago", chapters: 5, testament: "novo" },
  { name: "1 Pedro", chapters: 5, testament: "novo" },
  { name: "2 Pedro", chapters: 3, testament: "novo" },
  { name: "1 João", chapters: 5, testament: "novo" },
  { name: "2 João", chapters: 1, testament: "novo" },
  { name: "3 João", chapters: 1, testament: "novo" },
  { name: "Judas", chapters: 1, testament: "novo" },
  { name: "Apocalipse", chapters: 22, testament: "novo" }
];

export const popularThemes = [
  "Fé e Confiança",
  "Amor e Compaixão", 
  "Perdão e Reconciliação",
  "Esperança e Perseverança",
  "Gratidão e Louvor",
  "Arrependimento e Conversão",
  "Oração e Comunhão",
  "Família e Relacionamentos",
  "Liderança e Serviço",
  "Salvação e Graça",
  "Paz e Tranquilidade",
  "Sabedoria e Discernimento",
  "Prosperidade e Provisão",
  "Cura e Restauração",
  "Evangelização e Missões"
];

export interface SermonStructure {
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
