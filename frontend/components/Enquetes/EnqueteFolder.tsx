import ListaEnquetes from './ListaEnquetes';
import InputCriarEnquete from './InputCriarEnquete';

export default function EnqueteFolder() {
  return (
    <section className="container flex justify-center flex-col items-center p-10">
      <h1 className="text-3xl font-bold pt-5 pb-10 text-center">
        Crie e responda enquetes
      </h1>
      <InputCriarEnquete />
      <ListaEnquetes />
    </section>
  );
}
