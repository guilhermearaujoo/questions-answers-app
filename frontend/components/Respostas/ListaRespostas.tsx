import { useEffect, useState } from 'react';
import Resposta from './Resposta';
import { RespostaType } from '@/types/RespostaType';
import { useResposta } from '@/context/RespostaContext';
import { getRespostas } from '@/services/Resposta';

type params = {
  id: string;
};

export default function ListaRespostas({ id }: params) {
  const [respostas, setRespostas] = useState<RespostaType[]>([]);
  const { reloadResposta, setReloadResposta } = useResposta();

  async function setInitialState() {
    const data = await getRespostas();
    const respostas = data.filter(
      (resposta) => resposta.enqueteId === Number(id)
    );
    setRespostas(respostas);
  }

  useEffect(() => {
    reloadResposta && setInitialState();
    setReloadResposta(false);
  });

  return (
    <div className='py-10'>
      {respostas.length > 0 ? (
        <ul className='flex flex-col gap-3'>
          {respostas.map((resposta) => (
            <li key={resposta.id} data-testid={`resposta-${resposta.id}`}>
              <Resposta resposta={resposta} />
            </li>
          ))}
        </ul>
      ) : (
        <p className='text-md font-semibold'>Não há respostas cadastradas...</p>
      )}
    </div>
  );
}
