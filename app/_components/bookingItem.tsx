import { getServerSession } from "next-auth"
import { db } from "../_lib/prisma"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { Booking, Prisma } from "@prisma/client"
import { format } from "date-fns/format"
import { ptBR } from "date-fns/locale"
import { isFuture, isPast } from "date-fns"

interface BookingItemProps {
    booking: Prisma.BookingGetPayload<{
        include: {
            service: true,
            barbershop: true,
            user: true,
        },
    }>
}

// quero incluir os serviços dentro do booking, para isso

const BookingItem = ({ booking }: BookingItemProps) => {

    const isBookingConfirmed = isFuture(booking.date)

    return (
        <Card>
            <CardContent className=" flex flex-row  items-center py-0 px-0 " >
                <div className="flex flex-col gap-2 py-5 flex-[3] pl-5" >
                    <Badge variant={isBookingConfirmed ? "default" : "secondary"} className="w-fit">{
                        isBookingConfirmed ? "Confirmado" : "Finalizado"

                    }</Badge>
                    <h2 className="font-bold">{booking.service.name}</h2>
                    <div className="flex items-center gap-2" >
                        <Avatar className="h-6 w-6" >
                            <AvatarImage src={booking.barbershop.imageUrl} />
                            <AvatarFallback> { } </AvatarFallback>
                        </Avatar>
                        <h3 className="text-sm" > {booking.barbershop.name} </h3>
                    </div>
                </div>
                <div className="flex flex-col items-center border-l border-solid border-secondary px-3 flex-1" >
                    <p className="text-sm capitalize " > {format(
                        booking.date, "MMMM", {
                        locale: ptBR
                    }
                    )} </p>
                    <p className="text-2xl ">  {format(
                        booking.date, "dd", {
                        locale: ptBR
                    }
                    )}</p>
                    <p className="text-sm"> {format(
                        booking.date, "hh:mm", {
                        locale: ptBR
                    }
                    )}</p>
                </div>
            </CardContent>
        </Card>
    )
}

export default BookingItem