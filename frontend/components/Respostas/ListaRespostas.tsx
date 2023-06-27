import { useEffect, useState } from "react";
import Resposta from "./Resposta";
import { RespostaType } from "@/types/RespostaType";
import { useResposta } from "@/context/RespostaContext";
import { getRespostas } from "@/services/Resposta";
import { getEnqueteById } from "@/services/Enquete";

type params = {
  id: string;
}

export default function ListaRespostas({ id }: params) {
  const [ respostas, setRespostas ] = useState<RespostaType[]>([]);
  const { reloadResposta, setReloadResposta } = useResposta();
  const [ enquete, setEnquete ] = useState<string>('');

  async function setInitialState() {
    const data = await getRespostas();
    const respostas = data.filter((resposta) => resposta.enqueteId === Number(id));
    setRespostas(respostas);
  }

  useEffect(() => {
    reloadResposta && setInitialState();
    setReloadResposta(false);
  })
  
  useEffect(() => {
    getEnqueteById(Number(id)).then((enquete) => {
      setEnquete(enquete.pergunta);
    });
  }, [])
 
  return (
    <div>
      <h1>{enquete}</h1>
      { respostas.length > 0 ?     
        <ul>
          {respostas.map((resposta) => (
            <li key={resposta.id} data-testid={`resposta-${resposta.id}`} >
              <Resposta resposta={ resposta } />
            </li>
          ))}
        </ul> : <h2>Sem respostas</h2>
      }
    </div>
  )
}