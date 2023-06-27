import { useResposta } from "@/context/RespostaContext";
import { deleteResposta } from "@/services/Resposta";
import { RespostaType } from "@/types/RespostaType";

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
    <div className="flex gap-3">
      { resposta.resposta }
      <button
        onClick={handleDelete}
        data-testid={`delete-resposta-${resposta.id}`}
      >
        delete
      </button>
    </div>
  )
}