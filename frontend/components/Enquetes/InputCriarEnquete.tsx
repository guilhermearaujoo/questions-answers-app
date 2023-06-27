import { FormEvent, useState } from 'react';
import { postEnquete } from '@/services/Enquete';
import { useEnquete } from '@/context/EnqueteContext';

export default function InputCriarEnquete() {
  const [enquete, setEnquete] = useState<string>('');
  const { setRealoadEnquete } = useEnquete();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await postEnquete(enquete);
    if (response === 'SUCCESS') {
      setRealoadEnquete(true);
    }
  }

  return (
    <form
      onSubmit={ (e) => {
        handleSubmit(e);
      } }
    >
      <label htmlFor='enquete'>Informe sua enquete: </label>
      <input
        type='text'
        name='enquete'
        placeholder='Digite a enquete'
        onChange={(e) => {
          setEnquete(e.currentTarget.value);
        }}
        required
        minLength={5}
        data-testid='input-enquete'
      />
      <button type='submit' data-testid='add-enquete'>
        +
      </button>
    </form>
  );
}
