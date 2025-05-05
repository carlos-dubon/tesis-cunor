"use client";
import { compiledContract } from "@/app/_compiled-contract/compiledContract";
import { Button } from "@/app/_components/Button";
import { Input } from "@/app/_components/Input";
import { FormError } from "@/app/_util/form-error";
import { zodResolver } from "@hookform/resolvers/zod";
import { ethers } from "ethers";
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
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (form: z.infer<typeof FormSchema>) => {
    console.log(form);
    deploy();
  };

  const deploy = async () => {
    if (!window.ethereum) {
      alert("MetaMask not detected");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const factory = new ethers.ContractFactory(
      compiledContract.abi,
      compiledContract.bytecode,
      signer
    );

    try {
      const contract = await factory.deploy("Hello from Next.js!");
      await contract.waitForDeployment(); // equivalent to tx.wait()

      alert(`Contract deployed at: ${await contract.getAddress()}`);
    } catch (error) {
      console.error("Deployment failed", error);
    }
  };

  return (
    <div>
      <div className="font-bold text-2xl">Crear boleta</div>

      <form
        className="flex flex-col gap-4 mt-4"
        onSubmit={handleSubmit(onSubmit)}
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
        <Button type="submit">Crear boleta</Button>
      </form>
    </div>
  );
}
