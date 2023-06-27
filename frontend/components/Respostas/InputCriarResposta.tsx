import { useResposta } from "@/context/RespostaContext";
import { postResposta } from "@/services/Resposta";
import { FormEvent, useState } from "react";

type params = {
  id: string;
}

export default function InputCriarResposta({ id }: params) {
  const [resposta, setResposta] = useState<string>('');
  const { setReloadResposta } = useResposta();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await postResposta({ resposta, enqueteId: Number(id) } );
    if (response === 'SUCCESS') {
      setReloadResposta(true);
    }
  }

  return (
    <form
      onSubmit={ (e) => {
        handleSubmit(e);
      } }
    >
      <label htmlFor='resposta'>Informe sua resposta: </label>
      <input
        type='text'
        name='respsota'
        placeholder='Digite a resposta'
        onChange={(e) => {
          setResposta(e.currentTarget.value);
        }}
        required
        minLength={5}
        data-testid='input-resposta'
      />
      <button type='submit' data-testid='add-resposta'>
        +
      </button>
    </form>
  );
}