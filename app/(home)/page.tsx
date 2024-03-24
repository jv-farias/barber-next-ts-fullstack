import Header from "../_components/header";
import { format } from 'date-fns'
import { ptBR } from "date-fns/locale";
import Search from "./_components/search";
import BookingItem from "../_components/bookingItem";
import { db } from "../_lib/prisma";
import ServiceItem from "./_components/service-item";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";

export default async function Home() {

  const session = await getServerSession(authOptions)

  // está executando promise.all paralelamente




    const services = await db.service.findMany({
        include: {
            barbershop: true
        }
    })



  return (
    <>
      <Header />
      <div className="px-5 pt-6">
        <h2 className="text-xl font-bold">{session?.user ? `Olá, ${session.user.name?.split(" ")[0]}` : "Olá, vamos agendar um corte hoje?"}</h2>
        <p className="capitalize text-sm" > {format(new Date(), "EEEE',' dd 'de' MMMM", {
          locale: ptBR,
        }
        )}</p>
      </div>
      <div className="px-5 mt-6">
        <Search />
      </div>
      <div className="mt-6">
       
      </div>
      <div className="mt-6">
        <h2 className="px-5 text-xs mb-3 uppercase text-gray-400 font-bold">Recomendados</h2>
        <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden " >
        {services.map((service) => (
                <ServiceItem key={service.id} service={service} isAuthenticated={!!session?.user} barbershop={service.barbershop} ></ServiceItem>
            ))}
        </div>
      </div>
      <div className="mt-6 mb-[4.5rem]">
        <h2 className="px-5 text-xs mb-3 uppercase text-gray-400 font-bold">Populares</h2>
        <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden " >
        {services.map((service) => (
                <ServiceItem key={service.id} service={service} isAuthenticated={!!session?.user} barbershop={service.barbershop} ></ServiceItem>
            ))}
        </div>
      </div>
    </>
  );
}
