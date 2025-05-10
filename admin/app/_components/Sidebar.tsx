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
    <div className="flex flex-col gap-4 p-4 bg-gray-50">
      <div className="flex items-center gap-2">
        <MdHowToVote size={48} className="text-green-400" />
        <div>
          <div className="text-lg font-bold">Vota Seguro</div>
          <div className="text-sm text-gray-500">Admin</div>
        </div>
      </div>
      {menuItems.map((i) => (
        <Link href={i.href} key={i.href}>
          <Button
            variant={pathname === i.href ? "primary" : "secondary"}
            className="flex justify-start gap-2 w-full"
          >
            <div>
              <i.icon size={20} />
            </div>
            <div>{i.label}</div>
          </Button>
        </Link>
      ))}
    </div>
  );
};
