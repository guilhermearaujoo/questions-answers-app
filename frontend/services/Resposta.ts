import { RespostaType } from '@/types/RespostaType';

const URL = 'http://localhost:3001/respostas';

async function getRespostas(): Promise<RespostaType[]> {
  try {
    const data = await fetch(URL);
    const respostas = await data.json();

    return respostas as RespostaType[];
  } catch (error) {
    return [];
  }
}

async function postResposta(resposta: Omit<RespostaType, 'id'>) {
  try {
    const data = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resposta),
    });
    return 'SUCCESS';
  } catch (error) {
    return 'ERROR';
  }
}

async function deleteResposta(id: number) {
  try {
    const data = await fetch(`${URL}/${id}`, {
      method: 'DELETE',
    });
    return 'SUCCESS';
  } catch (error) {
    return 'ERROR';
  }
}

export { getRespostas, postResposta, deleteResposta };
