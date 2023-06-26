'use client'

import { ReactNode, useState } from "react";
import { EnqueteContext } from "./EnqueteContext";

type Props = {
  children: ReactNode;
};

export function EnqueteProvider({ children }: Props) {
  const [reloadEnquete, setRealoadEnquete] = useState(true);

  const value = {
    reloadEnquete,
    setRealoadEnquete
  }
  
  return (
      <>
          <EnqueteContext.Provider value={value}>
              {children}
          </EnqueteContext.Provider>
      </>
  );
}