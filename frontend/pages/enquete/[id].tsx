
import { useRouter } from 'next/router';
import ListaRespostas from '@/components/Respostas/ListaRespostas';
import InputCriarResposta from '@/components/Respostas/InputCriarResposta';
import { RespostaProvider } from '@/context/RespostaProvider';
import EnqueteResposta from '@/components/Respostas/EnqueteResposta';

function RespostasEnquete() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return;
  }

  return (
    <div className='container flex justify-center flex-col items-center p-10'>
      <RespostaProvider>
        <EnqueteResposta id={id.toString()} />
        <InputCriarResposta id={id.toString()}/>
        <ListaRespostas id={id.toString()} />
      </RespostaProvider>
    </div>
  );
}

export default RespostasEnquete;
