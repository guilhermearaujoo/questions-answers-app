import { Identifiable } from '.';

export interface Enquete extends Identifiable {
  id: number;
  pergunta: string;
}

export type EnqueteCreate = Omit<Enquete, 'id'>;