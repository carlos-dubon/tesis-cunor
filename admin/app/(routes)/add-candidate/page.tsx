"use client";
import { compiledContract } from "@/app/_compiled-contract/compiledContract";
import { Button } from "@/app/_components/Button";
import { Heading } from "@/app/_components/Heading";
import { Input } from "@/app/_components/Input";
import { useBallot } from "@/app/_context/BallotContext";
import { FormError } from "@/app/_util/form-error";
import { zodResolver } from "@hookform/resolvers/zod";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const CandidateFormSchema = z.object({
  address: z.string().min(1, FormError.required),
  name: z.string().min(1, FormError.required),
  dpi: z.string().min(1, FormError.required),
});

export default function AddCandidate() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(CandidateFormSchema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (form: z.infer<typeof CandidateFormSchema>) => {
    setIsLoading(true);

    try {
      if (!window.ethereum) {
        toast.error("MetaMask no pudo ser detectado.");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        form.address,
        compiledContract.abi,
        signer
      );

      const tx = await contract.addCandidate(form.name, form.dpi);
      await tx.wait();

      toast.success("Candidato agregado exitosamente!");
      reset();
      if (ballotAddress) setValue("address", ballotAddress);
    } catch (error) {
      console.error("Error al agregar candidato:", error);
      toast.error("Hubo un error al agregar el candidato.");
    } finally {
      setIsLoading(false);
    }
  };

  const { ballotAddress } = useBallot();

  useEffect(() => {
    if (ballotAddress) setValue("address", ballotAddress);
  }, [ballotAddress]);

  return (
    <div>
      <Heading title="Agregar candidato" />

      <form
        className="flex flex-col gap-4 mt-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          {...register("address")}
          required
          label="Dirección de la boleta"
          error={errors.address?.message}
        />
        <Input
          {...register("name")}
          required
          label="Nombre"
          error={errors.name?.message}
        />
        <Input
          {...register("dpi")}
          required
          label="DPI"
          error={errors.dpi?.message}
        />
        <Button type="submit" isLoading={isLoading}>
          Agregar candidato
        </Button>
      </form>
    </div>
  );
}
