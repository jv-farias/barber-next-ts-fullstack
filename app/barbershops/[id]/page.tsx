import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma"
import { ChevronLeftIcon, HeartIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import BarbershopInfo from "./_components/barbershop-info";
import ServiceItem from "./_components/service-item";

interface BarbershopDetailsPageProps {
    params: {
        id?: string;
    }
}

const BarbershopDetailsPage = async ({ params }: BarbershopDetailsPageProps) => {

    if (!params.id) {
        //TODO: retornar para home page

        return null
    }

    const barbershop = await db.barbershop.findUnique({
        where: {
            id: params.id
        },
        include: {
            services: true
        }
    })

    if (!barbershop) {
        return null
    }

    return (
        <>
            <BarbershopInfo barbershop={barbershop} />
            <div className="px-5 flex flex-col gap-5 py-6">
                {barbershop.services.map((service) => (
                    <ServiceItem key={service.id} service={service}></ServiceItem>
                ))}
            </div>

        </>
    )
}


export default BarbershopDetailsPage