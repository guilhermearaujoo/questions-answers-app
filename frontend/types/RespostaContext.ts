export type respostaContextType = {
  reloadResposta: boolean;
  setReloadResposta: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RespostaDefaultValues: respostaContextType = {
  reloadResposta: false,
  setReloadResposta: () => {},
}