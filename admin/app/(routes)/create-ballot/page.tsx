"use client";
import { Button } from "@/app/_components/Button";
import { Input } from "@/app/_components/Input";
import { FormError } from "@/app/_util/form-error";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  name: z.string().min(1, FormError.required),
  description: z.string().min(1, FormError.required),
});

export default function CreateBallotPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (form: z.infer<typeof FormSchema>) => {
    console.log(form);
  };

  return (
    <div>
      <div className="font-bold text-2xl">Crear boleta</div>

      <form
        className="flex flex-col gap-4 mt-4"
        onSubmit={handleSubmit((d) => console.log(d))}
      >
        <Input
          {...register("name")}
          required
          label="Nombre"
          error={errors.name?.message}
        />
        <Input
          {...register("description")}
          required
          label="Descripción"
          error={errors.description?.message}
        />
        <Button onClick={handleSubmit(onSubmit)}>Crear boleta</Button>
      </form>
    </div>
  );
}
