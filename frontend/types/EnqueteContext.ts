import { Enquete } from "./Enquete";

export type enqueteContextType = {
  reloadEnquete: boolean;
  setRealoadEnquete: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EnqueteDefaultValues: enqueteContextType = {
  reloadEnquete: false,
  setRealoadEnquete: () => {},
}