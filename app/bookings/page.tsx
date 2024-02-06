

import { getServerSession } from "next-auth"
import Header from "../_components/header"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation";
import BookingItem from "../_components/bookingItem";
import { db } from "../_lib/prisma";
import { isFuture, isPast } from "date-fns";
import { finished } from "stream";


const BookingsPage = async () => {

    // recuperar a sessão do usuário, para ver se ele está logado ou não
    // se ele não estiver logado, será redirecionado para a home

    const session = await getServerSession(authOptions);

    // usar midlewares

    if (!session?.user) {
        return redirect("/")
    }

    const [confirmedBookings, finishedBookings] = await Promise.all([
        db.booking.findMany({
            where: {
                userId: (session.user as any).id,
                date: {
                    gte: new Date()
                }
            },
            include: {
                service: true,
                barbershop: true,
            },
        }),
        db.booking.findMany({
            where: {
                userId: (session.user as any).id,
                date: {
                    lt: new Date()
                }
            },
            include: {
                service: true,
                barbershop: true,
            },
        })
    ])

    // isso gasta memória 
    // const confirmedBookings = bookings.filter(booking => isFuture(booking.date))
    // const finishedBookings = bookings.filter(booking => isPast(booking.date))

    return (
        <>
            <Header />
            <div className="flex flex-col px-5 py-6" >
                <h1 className="text-xl font-bold">Agendamentos</h1>
                {/* TODO: decidir se quando não houver reservas, apareça a mensagem>: "Não há reservas no momento" ou se não aparece a seção por completo */}

                {confirmedBookings.length > 0 &&
                    (<>
                        <h2 className="text-gray-400 uppercase font-bold text-sm mt-6 mb-3">CONFIRMADOS</h2>
                        <div className="flex flex-col gap-3 mt-3">
                            {confirmedBookings.map((booking) => (
                                <BookingItem booking={booking} key={booking.id} />
                            ))}
                        </div>
                    </>)}


                {finishedBookings.length > 0 && (
                    <>
                        <h2 className="text-gray-400 uppercase font-bold text-sm mt-6 mb-3">FINALIZADOS</h2>
                        <div className="flex flex-col gap-3 mt-3    ">
                            {finishedBookings.map((booking) => (
                                <BookingItem booking={booking} key={booking.id} />
                            ))}
                        </div>
                    </>
                )}


            </div>
        </>

    )
}

export default BookingsPage