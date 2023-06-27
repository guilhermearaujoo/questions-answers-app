import { getEnqueteById } from "@/services/Enquete";
import { useEffect, useState } from "react";

type params = {
  id: string;
}

export default function EnqueteResposta({ id }: params) {
  const [ enquete, setEnquete ] = useState<string>('');
  
  useEffect(() => {
    getEnqueteById(Number(id)).then((enquete) => {
      setEnquete(enquete.pergunta);
    });
  }, [id])

  return <h1 className='text-3xl font-bold pt-5 pb-10 text-center'>{enquete}</h1>
}