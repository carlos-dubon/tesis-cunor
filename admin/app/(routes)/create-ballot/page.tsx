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
import toast from "react-hot-toast";
import { z } from "zod";
import { QRCodeSVG } from "qrcode.react";
import { useBallot } from "@/app/_context/BallotContext";

const BallotFormSchema = z.object({
  title: z.string().min(1, FormError.required),
  description: z.string().min(1, FormError.required),
});

export default function CreateBallotPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(BallotFormSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState("");

  const { setBallotAddress } = useBallot();

  const onSubmit = async (form: z.infer<typeof BallotFormSchema>) => {
    setIsLoading(true);

    if (!window.ethereum) {
      toast.error("MetaMask no pudo ser detectado.");
      setIsLoading(false);
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const factory = new ethers.ContractFactory(
      compiledContract.abi,
      compiledContract.bytecode,
      signer
    );

    setBallotAddress("");

    try {
      const contract = await factory.deploy(form.title, form.description);
      await contract.waitForDeployment(); // equivalent to tx.wait()

      const contractAddress = await contract.getAddress();

      setAddress(contractAddress);
      setBallotAddress(contractAddress);
    } catch (error) {
      toast.error("El deploy fallo (revisar la consola)");
      console.error("Deployment failed", error);
    } finally {
      setIsLoading(false);
      reset();
    }
  };

  return (
    <div>
      <Heading title="Crear boleta" />

      <form
        className="flex flex-col gap-4 mt-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          {...register("title")}
          required
          label="Titulo"
          error={errors.title?.message}
        />
        <Input
          {...register("description")}
          required
          label="Descripción"
          error={errors.description?.message}
        />
        <Button type="submit" isLoading={isLoading}>
          Crear boleta
        </Button>
      </form>

      {address && (
        <div className="flex flex-col gap-4 mt-8">
          <div className="text-xl font-semibold text-green-500">
            La boleta fue desplegada con éxito!
          </div>

          <p>
            <span className="font-bold">Dirección:</span> {address}
          </p>

          <QRCodeSVG value={address} size={256} />
        </div>
      )}
    </div>
  );
}
