import Image from "next/image";
import Header from "../_components/header";
import { format } from 'date-fns'
import { ptBR } from "date-fns/locale";
import Search from "./_components/search";
import BookingItem from "../_components/bookingItem";
import { db } from "../_lib/prisma";
import BarbershopItem from "./_components/barbershopItem";

export default async function Home() {

  const barbershops = await db.barbershop.findMany({})

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
      <div className="px-5 mt-6">
        <h2 className="text-xs mb-3 uppercase text-gray-400 font-bold">Agendamentos</h2>
        <BookingItem />
      </div>
      <div className="mt-6">
        <h2 className="text-xs mb-3 uppercase text-gray-400 font-bold">Recomendados</h2>
        <div className="flex px-5 gap-4 overflow-x-auto [&:: -webkit-scrollbar]:hidden " >
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </>
  );
}
