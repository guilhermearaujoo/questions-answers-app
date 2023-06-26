import { EnqueteProvider } from "@/context/EnqueteProvider";
import EnqueteFolder from "@/components/Enquetes/EnqueteFolder";

export default function Home() {
  
  return (
    <main>
      <EnqueteProvider>
        <EnqueteFolder />
      </EnqueteProvider>
    </main>
  )
}
