import { Identifiable } from '.';

export interface Resposta extends Identifiable {
  resposta: string;
  enqueteId: number;
}

export type RespostaCreate = Omit<Resposta, 'id'>;