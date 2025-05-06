"use client";
import Link from "next/link";
import { Button } from "./Button";
import { usePathname } from "next/navigation";

interface MenuItem {
  href: string;
  label: string;
}

const menuItems: MenuItem[] = [
  {
    href: "/create-ballot",
    label: "Crear boleta",
  },
  {
    href: "/add-candidate",
    label: "Agregar candidato",
  },
  {
    href: "/candidates",
    label: "Lista de candidatos",
  },
  {
    href: "/add-voter",
    label: "Agregar votante",
  },
  {
    href: "/modify-ballot",
    label: "Modificar boleta",
  },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="text-lg font-bold">Admin</div>
      {menuItems.map((i) => (
        <Link href={i.href} key={i.href}>
          <Button
            variant={pathname === i.href ? "primary" : "secondary"}
            className="w-full"
          >
            {i.label}
          </Button>
        </Link>
      ))}
    </div>
  );
};
