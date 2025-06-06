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
import { z } from "zod";

const CandidatesFormSchema = z.object({
  address: z.string().min(1, FormError.required),
});

export default function CandidatesPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(CandidatesFormSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [candidates, setCandidates] = useState([]);

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

    const result = candidates.map(
      ({ name, voteCount, isRegistered }: never) => ({
        name,
        voteCount: Number(voteCount),
        isRegistered,
      })
    );

    console.log(result);
    setCandidates(result);

    setIsLoading(false);
  };

  const { ballotAddress } = useBallot();

  useEffect(() => {
    if (ballotAddress) setValue("address", ballotAddress);
  }, [ballotAddress]);

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

      <div className="mt-8 flex flex-col gap-2">
        {candidates.map((c, index) => {
          return <div key={index}>{JSON.stringify(c)}</div>;
        })}
      </div>
    </div>
  );
}
