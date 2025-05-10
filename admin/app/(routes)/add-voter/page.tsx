"use client";
import { Heading } from "@/app/_components/Heading";
import { Input } from "@/app/_components/Input";
import { Button } from "@/app/_components/Button";
import { FormError } from "@/app/_util/form-error";
import { zodResolver } from "@hookform/resolvers/zod";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toast from "react-hot-toast";
import { compiledContract } from "@/app/_compiled-contract/compiledContract";
import { useBallot } from "@/app/_context/BallotContext";

const AddVoterSchema = z.object({
  address: z.string().min(1, FormError.required),
  dpi: z.string().min(1, FormError.required),
});

export default function AddVoterPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(AddVoterSchema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (form: z.infer<typeof AddVoterSchema>) => {
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

      const tx = await contract.addVoter(form.dpi);
      await tx.wait();

      toast.success("Votante agregado exitosamente.");
      reset();
      if (ballotAddress) setValue("address", ballotAddress);
    } catch (error) {
      console.error("Error al agregar votante:", error);
      toast.error("No se pudo agregar el votante.");
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
      <Heading title="Agregar votante" />

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
          {...register("dpi")}
          required
          label="DPI del votante"
          error={errors.dpi?.message}
        />
        <Button type="submit" isLoading={isLoading}>
          Agregar votante
        </Button>
      </form>
    </div>
  );
}
