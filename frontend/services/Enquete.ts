import { EnqueteType } from '@/types/Enquete';

const URL = 'http://localhost:3001/enquetes';

async function postEnquete(pergunta: string) {
  try {
    const data = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pergunta }),
    });
    return 'SUCCESS';
  } catch (error) {
    return 'ERROR';
  }
}

async function getEnquetes(): Promise<EnqueteType[]> {
  try {
    const data = await fetch(URL);
    const enquetes = await data.json();

    return enquetes as EnqueteType[];
  } catch (error) {
    return [];
  }
}

function editEnquete(pergunta: EnqueteType) {
  try {
    return fetch(`${URL}/${pergunta.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pergunta: pergunta.pergunta }),
    }).then(() => 'SUCCESS');
  } catch (error) {
    return 'ERROR';
  }
}

async function deleteEnquete(id: number) {
  try {
    const data = await fetch(`${URL}/${id}`, {
      method: 'DELETE',
    });
    return 'SUCCESS';
  } catch (error) {
    return 'ERROR';
  }
}

async function getEnqueteById(id: number): Promise<EnqueteType> {
  try {
    const data = await fetch(`${URL}/${id}`);
    const enquete = await data.json();
    return enquete;
  } catch (error) {
    return {} as EnqueteType;
  }
}

export { postEnquete, getEnquetes, editEnquete, deleteEnquete, getEnqueteById };
