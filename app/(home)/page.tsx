import Image from "next/image";
import Header from "../_components/header";
import { format } from 'date-fns'
import { ptBR } from "date-fns/locale";
import Search from "./_components/search";

export default function Home() {
  return (
    <>
      <Header />
      <div className="px-5 pt-6">
        <h2 className="text-xl font-bold" >Olá, João Vitor</h2>
        <p className="capitalize text-sm" > {format(new Date(), "EEEE',' dd 'de' MMMM", {
          locale: ptBR,
        }
        )}</p>
      </div>
      <div className="px-5 mt-6">
        <Search />
      </div>
    </>
  );
}
