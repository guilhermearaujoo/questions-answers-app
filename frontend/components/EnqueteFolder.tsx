
import { useContext, useEffect } from 'react';
import ListaEnquetes from './ListaEnquetes';
import InputCriarEnquete from './InputCriarEnquete';
import { EnqueteContext } from '@/context/EnqueteContext';
import { getEnquetes } from '@/services/Enquete';

export default function EnqueteFolder() {

  return (
    <>
        <InputCriarEnquete />
        <ListaEnquetes />
    </>
  );
}
