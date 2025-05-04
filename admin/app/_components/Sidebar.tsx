import Link from "next/link";
import { Button } from "./Button";

export const Sidebar = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="text-gray-500 text-sm">Menu</div>
      <Link href="/">
        <Button className="w-full">Inicio</Button>
      </Link>
      <Link href="/create-ballot">
        <Button className="w-full">Crear boleta</Button>
      </Link>
    </div>
  );
};
