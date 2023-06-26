import { Enquete } from "@/types/Enquete";

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

async function getEnquetes(): Promise<Enquete[]> {
  try {
    const data = await fetch(URL);
    const enquetes = await data.json();
  
    return enquetes as Enquete[];
  } catch (error) {
    return [];
  }
}

export { postEnquete, getEnquetes }