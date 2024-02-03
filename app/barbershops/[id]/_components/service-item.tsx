"use client"

import { Button } from "@/app/_components/ui/button";
import { Calendar } from "@/app/_components/ui/calendar";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/app/_components/ui/sheet";
import { Barbershop, Service } from "@prisma/client";
import { ptBR } from "date-fns/locale";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useState, useMemo } from "react";
import { generateDayTimeList } from "../_helpers/hours";
import { format, setHours, setMinutes } from "date-fns";
import { saveBooking } from "../_actions/saveBooking";


interface ServiceItemProps {
    barbershop: Barbershop
    service: Service
    isAuthenticated: boolean
}

const ServiceItem = ({ service, isAuthenticated, barbershop }: ServiceItemProps) => {

    const handleBookingClick = () => {
        if (!isAuthenticated) {
            return signIn("google");
        }
    }

    const {data} = useSession()
    const [date, setDate] = useState<Date | undefined>(undefined)
    const [hour, setHour] = useState<string | undefined>()

    const handleDateClick = (date: Date | undefined) => {
        setDate(date);
        setHour(undefined)
    }

    const timeList = useMemo(() => {
        return date ? generateDayTimeList(date) : [];
    }, [date])

    const handleTimeClick = (time: string) => {
        setHour(time)
    }

    const handleBookingSubmit = async () => {
        try {

            if (!hour || !date || !data?.user) {
                return
            }

            const dateHour = Number(hour.split(":")[0])
            const dateMinutes = Number(hour.split(":")[1])
            const newDate = setMinutes(setHours(date, dateHour), dateMinutes)
            
            await saveBooking({
                serviceId: service.id,
                barbershopId: barbershop.id,
                date: newDate,
                userId:(data.user as any).id
            })
        }

        catch(error) {
            console.log(error)
        }
    }


    return (
        <>
            <Card>
                <CardContent className="p-3">
                    <div className="flex gap-4 items-center ">
                        <div className="relative min-h-[110px] min-w-[110px]  max-h-[110px] max-w-[110px]">
                            <Image src={service.imageUrl} alt={service.name} fill className="rounded-lg" style={{ objectFit: "cover" }} />
                        </div>
                        <div className="flex flex-col w-full">
                            <h2 className="font-bold text-sm" >{service.name} </h2>
                            <p className="text-sm text-gray-400">{service.description} </p>
                            <div className="flex items-center justify-between mt-3">
                                <p className="text-primary font-bold">
                                    {/* transformar o valor do db em reais */}
                                    {Intl.NumberFormat("pt-BR",
                                        {
                                            style: "currency",
                                            currency: "BRL"
                                        }).format(Number(service.price))} </p>
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button onClick={handleBookingClick} variant="secondary">Agendar</Button>
                                    </SheetTrigger>
                                    <SheetContent className="p-0">
                                        <SheetHeader className="px-5 py-6 border-b border-solid border-secondary">
                                            <SheetTitle className="text-left">
                                                Fazer Reserva
                                            </SheetTitle>
                                        </SheetHeader>
                                        <div className="py-6">
                                            <Calendar
                                                mode="single"
                                                selected={date}
                                                onSelect={handleDateClick}

                                                // propriedade para selecionar apenas a data a partir do dia atual
                                                fromDate={new Date()}
                                                locale={ptBR}
                                                styles={{

                                                    head_cell: {
                                                        width: "100%",
                                                        textTransform: "capitalize"
                                                    },
                                                    cell: {
                                                        width: "100%",
                                                    },
                                                    button: {
                                                        width: "100%"
                                                    },
                                                    nav_button_previous: {
                                                        width: "32px",
                                                        height: "32px"
                                                    },
                                                    nav_button_next: {
                                                        width: "32px",
                                                        height: "32px"
                                                    },
                                                    caption: {
                                                        textTransform: "capitalize"
                                                    }
                                                }} />
                                        </div>


                                        {/* Mostrar os horários apenas ao usuário clicar no calendário */}

                                        {date && (
                                            <div className=" overflow-x-auto flex gap-3 [&::-webkit-scrollbar]:hidden py-6 px-5 border-t border-solid border-secondary">
                                                {timeList.map((time) => (
                                                    <Button onClick={() => handleTimeClick(time)} variant={hour === time ? "default" : "outline"} className="rounded-full" key={time} > {time} </Button>
                                                ))}
                                            </div>
                                        )}

                                        <div className="py-6 px-5 border-t border-solid border-secondary">
                                            <Card>
                                                <CardContent className="p-3 flex flex-col gap-1 ">
                                                    <div className="flex items-center justify-between">
                                                        <h2 className="font-bold" > {service.name} </h2>
                                                        <h3 className="font-bold text-sm" > {/* transformar o valor do db em reais */}
                                                            {Intl.NumberFormat("pt-BR",
                                                                {
                                                                    style: "currency",
                                                                    currency: "BRL"
                                                                }).format(Number(service.price))} </h3>
                                                    </div>
                                                    <div >
                                                        {date && (
                                                            <div className="flex items-center justify-between">
                                                                <h3 className="text-gray-400 text-sm" >Data</h3>
                                                                <h4 className="text-gray-400 text-sm "> {format(date, "dd 'de' MMMM ", {
                                                                    locale: ptBR,
                                                                })} </h4>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div >
                                                        {hour && (
                                                            <div className="flex items-center justify-between">
                                                                <h3 className="text-gray-400 text-sm" >Horário</h3>
                                                                <h4 className="text-gray-400 text-sm "> {hour} </h4>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <h3 className="text-gray-400 text-sm" >Barbearia</h3>
                                                        <h4 className="text-gray-400 text-sm "> {barbershop.name} </h4>
                                                    </div>
                                                </CardContent>

                                            </Card>
                                        </div>
                                            <SheetFooter className="px-5 "  >
                                                <Button onClick={handleBookingSubmit} disabled={!hour || !date} >Confirmar Reserva</Button>
                                            </SheetFooter>
                                    </SheetContent>
                                </Sheet>
                            </div>
                        </div>

                    </div>

                </CardContent>
            </Card>
        </>
    )
}

export default ServiceItem;