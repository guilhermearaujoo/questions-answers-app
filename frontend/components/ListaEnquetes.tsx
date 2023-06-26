import React, { useContext, useEffect, useState } from 'react';
import { EnqueteContext } from '@/context/EnqueteContext';
import { getEnquetes } from '@/services/Enquete';
import { Enquete } from '@/types/Enquete';

export default function Enquetes() {

  const { reloadEnquete, setRealoadEnquete } = useContext(EnqueteContext);
  const [enquetes, setEnquetes] = useState<Enquete[]>([]);

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
          <li key={enquete.id} data-testid={`enquete-${enquete.id}`} >{enquete.pergunta}</li>
        ))}
      </ul>
    </div>
  );
}
