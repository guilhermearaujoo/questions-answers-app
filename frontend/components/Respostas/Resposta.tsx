import { useResposta } from '@/context/RespostaContext';
import { deleteResposta } from '@/services/Resposta';
import { RespostaType } from '@/types/RespostaType';
import { FaTrash } from 'react-icons/fa';

type props = {
  resposta: RespostaType;
};

export default function Resposta({ resposta }: props) {
  const { setReloadResposta } = useResposta();

  const handleDelete = async () => {
    const response = await deleteResposta(resposta.id);
    if (response === 'SUCCESS') {
      setReloadResposta(true);
    }
  };

  return (
    <div className='flex gap-3'>
      <div className='card-disabled'>
        <p className='text-lg font-semibold cursor-pointer'>
          {resposta.resposta}
        </p>
        <button
          onClick={handleDelete}
          data-testid={`delete-resposta-${resposta.id}`}
          className='btn-hover'
        >
          <FaTrash color='red' size={30} />
        </button>
      </div>
    </div>
  );
}
