"use client";

import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import {
  CalendarIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  UserIcon,
} from "lucide-react";
import { signIn, useSession, signOut } from "next-auth/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";

const Header = () => {
  const { data, status } = useSession();

  const handleLoginClick = () => {
    signIn("google");
  };

  const handleLogoutClick = () => {
    signOut();
  };

  return (
    <Card>
      <CardContent className="p-5 flex justify-between items-center flex-row">
        <Image src="/logo.png" alt="Logo FSW Barber" width={122} height={20} />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <MenuIcon size={16} />
            </Button>
          </SheetTrigger>

          <SheetContent className="p-0">
            <SheetHeader className="p-5 text-left border-b border-solid border-secondary">
              {data?.user ? (
                <div className="flex justify-between px-5 py-6 items-center">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={data.user.image ?? ""} />
                    </Avatar>
                    <h2 className="font-bold">{data.user.name}</h2>
                  </div>
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={handleLogoutClick}
                  >
                    <LogOutIcon />
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex flex-col px-5 py-6 gap-3">
                    <div className="flex items-center gap-2">
                      <UserIcon size={32} />
                      <h2 className="font-bold">Olá, faça seu login!</h2>
                    </div>
                  </div>
                  <Button
                    onClick={handleLoginClick}
                    variant="secondary"
                    className="w-full justify-start"
                  >
                    <LogInIcon className="mr-2" size={18} />
                    Fazer Login
                  </Button>
                </>
              )}

              {/* asChild transforma todo o botão em um link */}

              <div className="flex flex-col gap-3 ">
                <Button variant="outline" className="justify-start" asChild>
                  <Link href="/">
                    <HomeIcon size={18} className="mr-2" />
                    Início
                  </Link>
                </Button>
              </div>

              {data?.user && (
                <Button variant="outline" className="justify-start" asChild>
                  <Link href="/bookings">
                    <CalendarIcon size={18} className="mr-2">
                      Agendamentos
                    </CalendarIcon>
                  </Link>
                </Button>
              )}
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  );
};

export default Header;
