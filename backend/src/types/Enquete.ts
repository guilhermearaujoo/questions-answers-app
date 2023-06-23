export type Enquete = {
  id: number;
  pergunta: string;
};

export type EnqueteCreate = Omit<Enquete, 'id'>;