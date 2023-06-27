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
    setEnquete('');
  };

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
      className='flex flex-col form'
    >
      <div className='flex justify-between gap-2'>
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
          className='input'
          value={enquete}
        />
        <button type='submit' data-testid='add-enquete' className='btn-create'>
          +
        </button>
      </div>
    </form>
  );
}
