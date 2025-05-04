import { Button } from "@/app/_components/Button";
import { Input } from "@/app/_components/Input";

export default function CreateBallotPage() {
  return (
    <div>
      <div className="font-bold text-2xl">Crear boleta</div>
      <div className="text-sm text-gray-400">
        Conecta una wallet antes de proceder*
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <Input label="Nombre" />
        <Input label="Descripción" />
        <Button>Crear boleta</Button>
      </div>
    </div>
  );
}
