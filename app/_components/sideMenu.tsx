

import {
    CalendarIcon,
    HomeIcon,
    LogInIcon,
    LogOutIcon,

    UserIcon,
  } from "lucide-react";
import { Button } from "./ui/button";
import { SheetHeader } from "./ui/sheet";
import { useSession, signIn, signOut } from "next-auth/react";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";

const SideMenu = () => {
  const { data, status } = useSession();

  const handleLoginClick = () => {
    signIn("google");
  };

  const handleLogoutClick = () => {
    signOut();
  };

  return (
    <>
      <SheetHeader className="p-5 text-left border-b border-solid border-secondary">
        {data?.user ? (
          <div className="flex justify-between px-5 py-6 items-center">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={data.user.image ?? ""} />
              </Avatar>
              <h2 className="font-bold">{data.user.name}</h2>
            </div>
            <Button variant="secondary" size="icon" onClick={handleLogoutClick}>
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
        <Link href="/">
          <CalendarIcon size={18} className="mr-2" />
          Agendamentos
        </Link>
      </Button>
        )}
      </SheetHeader>
    </>
  );
};

export default SideMenu;