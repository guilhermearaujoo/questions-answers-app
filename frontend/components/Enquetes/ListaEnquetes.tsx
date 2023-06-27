import React, { useEffect, useState } from 'react';
import { useEnquete } from '@/context/EnqueteContext';
import { getEnquetes } from '@/services/Enquete';
import { EnqueteType } from '@/types/Enquete';
import Enquete from './Enquete';

export default function Enquetes() {
  const { reloadEnquete, setRealoadEnquete } = useEnquete();
  const [enquetes, setEnquetes] = useState<EnqueteType[]>([]);

  async function setInitialState() {
    const enquete = await getEnquetes();
    setEnquetes(enquete);
  }

  useEffect(() => {
    reloadEnquete && setInitialState();
    setRealoadEnquete(false);
  });

  return (
    <div className='py-10'>
      {enquetes.length > 0 ? (
        <ul className='flex flex-col gap-3'>
          {enquetes.map((enquete) => (
            <li key={enquete.id} data-testid={`enquete-${enquete.id}`}>
              <Enquete enquete={enquete} />
            </li>
          ))}
        </ul>
      ) : (
        <p className='text-md font-semibold'>Não há enquetes cadastradas...</p>
      )}
    </div>
  );
}
