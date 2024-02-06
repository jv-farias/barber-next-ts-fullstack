"use client"

import { Card, CardContent } from "@/app/_components/ui/card"
import Image from "next/image"
import { Barbershop } from "@prisma/client"
import { Button } from "@/app/_components/ui/button";
import { Badge } from "@/app/_components/ui/badge";
import { StarIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface BarbershopItemProps {
    barbershop: Barbershop;
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {

    const router = useRouter()
    const handleBookingClick = () => {
        router.push(`/barbershops/${barbershop.id}`)
    }


    return (
        <Card className="min-w-full max-w-full rounded-2xl ">
            <CardContent className="px-1 py-0">
                <div className="relative w-full h-[159px]">
                    <div className="absolute top-2.5 left-1.5 z-50">
                        <Badge variant="secondary" className=" opacity-90 flex gap-1 items-center top-2 left-2 ">
                            <StarIcon size={12} className="fill-primary text-primary" />
                            <span className="text-xs" >5,0</span>
                        </Badge>
                    </div>
                    <Image
                        src={barbershop.imageUrl}
                        style={{ objectFit: 'cover' }}
                        fill
                        className="rounded-2xl py-1"
                        alt={barbershop.name} />
                </div>
                <div className="px-2 pb-3">
                    <h2 className="font-bold mt-2 overflow-hidden text-ellipsis text-nowrap"> {barbershop.name} </h2>
                    <p className="text-sm text-gray-400 overflow-hidden text-ellipsis text-nowrap" > {barbershop.address} </p>
                    <Button variant="secondary" className="w-full mt-3" onClick={handleBookingClick} >Reservar</Button>
                </div>

            </CardContent>
        </Card>
    )
}

export default BarbershopItem