"use client"

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { Prisma } from "@prisma/client"
import { format } from "date-fns/format"
import { ptBR } from "date-fns/locale"
import { isFuture } from "date-fns"
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import Image from "next/image"
import { Button } from "./ui/button"
import { cancelBooking } from "../_actions/cancelBooking"
import { toast } from "sonner"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog"

interface BookingItemProps {
    booking: Prisma.BookingGetPayload<{
        include: {
            service: true,
            barbershop: true,

        },
    }>
}

// quero incluir os serviços dentro do booking, para isso

const BookingItem = ({ booking }: BookingItemProps) => {

    const [isDeleteLoading, setIsDeleteLoading] = useState(false);
    const handleCancelClick = async () => {

        setIsDeleteLoading(true)

        try {
            await cancelBooking(booking.id);
            toast.success("Reserva cancelada com sucesso!")
        } catch (error) {
            console.error(error)
        } finally {
            setIsDeleteLoading(false)
        }
    }


    const isBookingConfirmed = isFuture(booking.date)

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Card className="min-w-full" >
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
            </SheetTrigger>
            <SheetContent className="px-8">
                <SheetHeader className="pt-5 text-left pb-b border-b border-solid border-secondary" >
                    <SheetTitle>
                        Informações da Reserva
                    </SheetTitle>
                </SheetHeader>
                <div>
                    <div className="relative h-[180px] w-full mt-6">
                        <Image src="/map.png" fill alt={booking.barbershop.name} />
                        <div className="w-full absolute bottom-4 left-0 px-3">
                            <Card >
                                <CardContent className="p-3  flex gap-2 items-center justify-center" >
                                    <Avatar>
                                        <AvatarImage src={booking.barbershop.imageUrl} />
                                    </Avatar>
                                    <div>
                                        <h2 className="font-bold overflow-hidden whitespace-nowrap overflow-ellipsis">
                                            {booking.barbershop.name}
                                        </h2>
                                        <h3 className="text-xs overflow-hidden whitespace-nowrap overflow-ellipsis">
                                            {booking.barbershop.address}
                                        </h3>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>


                    </div>
                    <Badge variant={isBookingConfirmed ? "default" : "secondary"} className="my-3 w-fit">{
                        isBookingConfirmed ? "Confirmado" : "Finalizado"

                    }</Badge>
                    <Card className="   ">
                        <CardContent className="p-3 gap-3 flex flex-col">
                            <div className="flex justify-between">
                                <h2 className="font-bold">{booking.service.name}</h2>
                                <h3 className="font-bold text-sm">
                                    {" "}
                                    {Intl.NumberFormat("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    }).format(Number(booking.service.price))}
                                </h3>
                            </div>


                            <div className="flex justify-between">
                                <h3 className="text-gray-400 text-sm">Data</h3>
                                <h4 className="text-sm">
                                    {format(booking.date, "dd 'de' MMMM", {
                                        locale: ptBR,
                                    })}
                                </h4>
                            </div>


                            {booking.date && (
                                <div className="flex justify-between">
                                    <h3 className="text-gray-400 text-sm">Horário</h3>
                                    <h4 className="text-sm">{format(booking.date, "hh:mm", {
                                        locale: ptBR,
                                    })}</h4>
                                </div>
                            )}

                            <div className="flex justify-between">
                                <h3 className="text-gray-400 text-sm">Barbearia</h3>
                                <h4 className="text-sm">{booking.barbershop.name}</h4>
                            </div>
                        </CardContent>
                    </Card>
                    <SheetFooter className="mt-3 flex flex-row gap-3 justify-center" >
                        <SheetClose>
                            <Button className="w-full" variant="secondary" >Voltar</Button>
                        </SheetClose>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button disabled={!isBookingConfirmed || isDeleteLoading} className="w-full" variant="destructive">
                                    Cancelar Reserva
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="w-[90%]">
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Deseja mesmo cancelar essa reserva?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Uma vez cancelada, não será possível reverter essa ação.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter className="flex-row gap-3">
                                    <AlertDialogCancel className="w-full mt-0">Voltar</AlertDialogCancel>
                                    <AlertDialogAction disabled={isDeleteLoading} className="w-full" onClick={handleCancelClick}>
                                        {isDeleteLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Confirmar
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </SheetFooter>
                </div>
            </SheetContent>
        </Sheet >
    )
}

export default BookingItem