import { RespostaDefaultValues, respostaContextType } from "@/types/RespostaContext";
import { createContext, useContext } from "react";

export const RespostaContext = createContext<respostaContextType>(RespostaDefaultValues);

export function useResposta() {
    return useContext(RespostaContext);
}