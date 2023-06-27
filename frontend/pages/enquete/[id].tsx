import { getRespostas } from '@/services/Resposta';
import { getEnquetes } from '@/services/Enquete';
import { RespostaType } from '@/types/RespostaType';
import { GetStaticProps, GetStaticPaths } from 'next';
import { EnqueteType } from '@/types/Enquete';
import { useRouter } from 'next/router';
import ListaRespostas from '@/components/Respostas/ListaRespostas';
import InputCriarResposta from '@/components/Respostas/InputCriarResposta';
import { RespostaProvider } from '@/context/RespostaProvider';

// export const getStaticProps: GetStaticProps = async (context) => {
//   const enqueteId = context.params?.id;

//   const data = await getRespostas();

//   const respostas = data.filter(
//     (item: RespostaType) => item.enqueteId === Number(enqueteId)
//   );

//   const enquetes = await getEnquetes();
//   const enquete = enquetes.find(enquete => enquete.id === Number(enqueteId));

//   if (!enquete) {
//     return {
//       notFound: true
//     };
//   }

//   if(respostas.length === 0) {
//     return {
//       props: {
//         enquete: enquete.pergunta,
//         hasError: true
//       }
//     }
//   }

//   return {
//     props: {
//       respostas,
//       enquete: enquete.pergunta,
//     },
//   };
// };

// export const getStaticPaths: GetStaticPaths = async () => {
//   const data = await getEnquetes();
//   const pathsWithParams = data.map((enquete: EnqueteType) => ({
//     params: { id: enquete.id.toString() },
//   }));

//   return {
//     paths: pathsWithParams,
//     fallback: 'blocking',
//   };
// };

function RespostasEnquete() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return;
  }

  return (
    <div>
      <RespostaProvider>
        <InputCriarResposta id={id.toString()}/>
        <ListaRespostas id={id.toString()} />
      </RespostaProvider>
    </div>
  );
}

export default RespostasEnquete;
