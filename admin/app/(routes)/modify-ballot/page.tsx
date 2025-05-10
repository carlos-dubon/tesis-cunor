"use client";
import { Heading } from "@/app/_components/Heading";
import { Input } from "@/app/_components/Input";
import { Button } from "@/app/_components/Button";
import { FormError } from "@/app/_util/form-error";
import { zodResolver } from "@hookform/resolvers/zod";
import { ethers } from "ethers";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { compiledContract } from "@/app/_compiled-contract/compiledContract";
import { useBallot } from "@/app/_context/BallotContext";

const ModifyBallotSchema = z.object({
  address: z.string().min(1, FormError.required),
});

export default function ModifyBallotPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(ModifyBallotSchema),
  });

  const [isLoadingStart, setIsLoadingStart] = useState(false);
  const [isLoadingEnd, setIsLoadingEnd] = useState(false);
  const [contractAddress, setContractAddress] = useState("");
  const [hasStarted, setHasStarted] = useState<boolean | null>(null);
  const [hasEnded, setHasEnded] = useState<boolean | null>(null);

  const fetchStatus = async (address: string) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(
        address,
        compiledContract.abi,
        provider
      );

      const started = await contract.hasStarted();
      const ended = await contract.hasEnded();

      setHasStarted(started);
      setHasEnded(ended);
    } catch (error) {
      console.error("Error al obtener el estado de la boleta:", error);
      toast.error("No se pudo obtener el estado de la boleta.");
    }
  };

  const onSubmit = async (data: z.infer<typeof ModifyBallotSchema>) => {
    setContractAddress(data.address);
    await fetchStatus(data.address);
  };

  const handleStart = async () => {
    if (!contractAddress) {
      toast.error("Debes ingresar la dirección de la boleta.");
      return;
    }

    setIsLoadingStart(true);

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        compiledContract.abi,
        signer
      );

      const tx = await contract.startBallot();
      await tx.wait();

      toast.success("La votación ha comenzado.");
      await fetchStatus(contractAddress);
    } catch (error) {
      console.error("Error al iniciar la votación:", error);
      toast.error("No se pudo iniciar la votación.");
    } finally {
      setIsLoadingStart(false);
    }
  };

  const handleEnd = async () => {
    if (!contractAddress) {
      toast.error("Debes ingresar la dirección de la boleta.");
      return;
    }

    setIsLoadingEnd(true);

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        compiledContract.abi,
        signer
      );

      const tx = await contract.endBallot();
      await tx.wait();

      toast.success("La votación ha finalizado.");
      await fetchStatus(contractAddress);
    } catch (error) {
      console.error("Error al finalizar la votación:", error);
      toast.error("No se pudo finalizar la votación.");
    } finally {
      setIsLoadingEnd(false);
    }
  };

  const { ballotAddress } = useBallot();

  useEffect(() => {
    if (ballotAddress) setValue("address", ballotAddress);
  }, [ballotAddress]);

  return (
    <div>
      <Heading title="Modificar boleta" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mt-4"
      >
        <Input
          {...register("address")}
          required
          label="Dirección de la boleta"
          error={errors.address?.message}
        />
        <Button type="submit">Cargar dirección</Button>
      </form>

      {contractAddress && (
        <div className="flex flex-col gap-4 mt-8">
          <Button isLoading={isLoadingStart} onClick={handleStart}>
            Iniciar votación
          </Button>
          <Button isLoading={isLoadingEnd} onClick={handleEnd}>
            Finalizar votación
          </Button>

          <div className="mt-4 space-y-1">
            <p>
              <strong>¿Votación iniciada?</strong>{" "}
              {hasStarted === null ? "Cargando..." : hasStarted ? "Sí" : "No"}
            </p>
            <p>
              <strong>¿Votación finalizada?</strong>{" "}
              {hasEnded === null ? "Cargando..." : hasEnded ? "Sí" : "No"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
