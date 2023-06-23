export type Resposta = {
  id: number;
  resposta: string;
  enqueteId: number;
};

export type RespostaCreate = Omit<Resposta, 'id'>;