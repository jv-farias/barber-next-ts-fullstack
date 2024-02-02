"use client";

import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { Barbershop } from "@prisma/client";
import {
  ChevronLeftIcon,
  HeartIcon,
  MapPinIcon,
  MenuIcon,
  StarIcon,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../../../_components/ui/sheet";
import SideMenu from "@/app/_components/sideMenu";

interface BarbershopInfoProps {
  barbershop: Barbershop;
}

const BarbershopInfo = ({ barbershop }: BarbershopInfoProps) => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <>
      <div className="relative w-full h-[250px]">
        <Button
          onClick={handleBackClick}
          size="icon"
          variant="outline"
          className="absolute z-50 top-3 left-3"
        >
          <ChevronLeftIcon />
        </Button>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="absolute z-50 top-3 right-3"
            >
              <MenuIcon size={16} />
            </Button>
          </SheetTrigger>

          <SheetContent className="p-0">
            <SideMenu />
          </SheetContent>
        </Sheet>

        <Image
          src={barbershop.imageUrl}
          fill
          style={{ objectFit: "cover" }}
          className="opacity-75"
          alt={barbershop.name}
        />
      </div>

      <div className="flex flex-col px-5 pt-3 gap-2 pb-6 border-b border-solid border-secondary ">
        <h1 className="text-xl font-bold">{barbershop.name}</h1>
        <div className="flex items-center gap-1">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm">{barbershop.address}</p>
        </div>
        <div className="flex items-center gap-1">
          <StarIcon className="fill-primary text-primary" size={18} />
          <p className="text-sm">4,8 (250 Avaliações)</p>
        </div>
      </div>
    </>
  );
};

export default BarbershopInfo;
