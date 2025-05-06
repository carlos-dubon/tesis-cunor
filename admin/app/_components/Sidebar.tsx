"use client";
import Link from "next/link";
import { Button } from "./Button";
import { usePathname } from "next/navigation";
import { MdHowToVote } from "react-icons/md";
import { BiPlus } from "react-icons/bi";
import { IconType } from "react-icons";
import { BiUser } from "react-icons/bi";
import { BiPowerOff } from "react-icons/bi";

interface MenuItem {
  href: string;
  label: string;
  icon: IconType;
}

const menuItems: MenuItem[] = [
  {
    href: "/create-ballot",
    label: "Crear boleta",
    icon: BiPlus,
  },
  {
    href: "/add-candidate",
    label: "Agregar candidato",
    icon: BiPlus,
  },
  {
    href: "/candidates",
    label: "Lista de candidatos",
    icon: BiUser,
  },
  {
    href: "/add-voter",
    label: "Agregar votante",
    icon: BiPlus,
  },
  {
    href: "/modify-ballot",
    label: "Modificar boleta",
    icon: BiPowerOff,
  },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center gap-2">
        <MdHowToVote size={32} />
        <div className="text-lg font-bold">Admin</div>
      </div>
      {menuItems.map((i) => (
        <Link href={i.href} key={i.href}>
          <Button
            variant={pathname === i.href ? "primary" : "secondary"}
            className="w-full"
          >
            <div className="flex items-center gap-2 w-full">
              <div className="w-[205px] text-left">{i.label}</div>
              <i.icon size={20} />
            </div>
          </Button>
        </Link>
      ))}
    </div>
  );
};
