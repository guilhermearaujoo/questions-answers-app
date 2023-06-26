import { EnqueteType } from "@/types/Enquete";

const URL = "http://localhost:3001/enquetes"

function postEnquete(pergunta: string) {
  try {
    return fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pergunta }),
    }).then(() => 'SUCCESS');
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

function deleteEnquete(id: number) {
  try {
    return fetch(`${URL}/${id}`, {
      method: 'DELETE',
    }).then(() => 'SUCCESS');
  } catch (error) {
    return 'ERROR';
  }
}

export { postEnquete, getEnquetes, editEnquete, deleteEnquete }