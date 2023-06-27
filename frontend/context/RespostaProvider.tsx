'use client'

import { ReactNode, useState } from "react";
import { RespostaContext } from "./RespostaContext";

type Props = {
  children: ReactNode;
};

export function RespostaProvider({ children }: Props) {
  const [reloadResposta, setReloadResposta] = useState(true);

  const value = {
    reloadResposta,
    setReloadResposta,
  }
  
  return (
      <>
          <RespostaContext.Provider value={value}>
              {children}
          </RespostaContext.Provider>
      </>
  );
}