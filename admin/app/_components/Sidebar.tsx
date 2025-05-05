import Link from "next/link";
import { Button } from "./Button";

export const Sidebar = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="text-gray-500 text-sm">Menu</div>
      <Link href="/create-ballot">
        <Button className="w-full">Crear boleta</Button>
      </Link>
      <Link href="/add-candidate">
        <Button className="w-full">Agregar candidato</Button>
      </Link>
      <Link href="/add-voter">
        <Button className="w-full">Agregar votante</Button>
      </Link>
      <Link href="/modify-ballot">
        <Button className="w-full">Modificar boleta</Button>
      </Link>
    </div>
  );
};
