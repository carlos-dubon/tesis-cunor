"use client";
import { compiledContract } from "@/app/_compiled-contract/compiledContract";
import { Button } from "@/app/_components/Button";
import { Heading } from "@/app/_components/Heading";
import { Input } from "@/app/_components/Input";
import { FormError } from "@/app/_util/form-error";
import { zodResolver } from "@hookform/resolvers/zod";
import { ethers } from "ethers";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const CandidatesFormSchema = z.object({
  address: z.string().min(1, FormError.required),
});

export default function CandidatesPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CandidatesFormSchema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (form: z.infer<typeof CandidatesFormSchema>) => {
    setIsLoading(true);

    if (!window.ethereum) {
      throw new Error("MetaMask is not installed");
      setIsLoading(false);
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(
      form.address,
      compiledContract.abi,
      signer
    );

    const candidates = await contract.getCandidates();

    console.log(candidates);

    setIsLoading(false);
  };

  return (
    <div>
      <Heading title="Lista de candidatos" />

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
        <Button type="submit" isLoading={isLoading}>
          Ver lista de candidatos
        </Button>
      </form>
    </div>
  );
}
