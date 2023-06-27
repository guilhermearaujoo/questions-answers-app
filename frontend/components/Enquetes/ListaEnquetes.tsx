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
  })

  return (
    <div>
      <h1>Enquetes</h1>
      <ul>
        {enquetes.map((enquete) => (
          <li key={enquete.id} data-testid={`enquete-${enquete.id}`} >
            <Enquete enquete={ enquete } />
          </li>
        ))}
      </ul>
    </div>
  );
}
