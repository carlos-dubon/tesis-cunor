import React, { useEffect, useState } from "react";
import { Alert, View, StyleSheet } from "react-native";
import { Button, Text } from "@react-navigation/elements";
import { AppKitButton } from "@reown/appkit-wagmi-react-native";
import { compiledContract } from "../../compiledContact/compiledContact";
import { useAccount, useWriteContract } from "wagmi";

const contractAddress = "0x8604415a6Bd5b609218d5C5B014c1E3d7dAD86Dd";

export function Home() {
  const { isConnected, address, status } = useAccount();

  const { data, isPending, isSuccess, isError, writeContract, error } =
    useWriteContract();

  const onPress = async () => {
    try {
      writeContract({
        address: contractAddress,
        abi: compiledContract.abi,
        functionName: "castVote",
        args: ["1", "123"],
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log({ data, isPending, isSuccess, isError, error });
  }, [data, isPending, isSuccess, isError, error]);

  return (
    <View style={styles.container}>
      <AppKitButton />
      <Button onPress={() => onPress()} disabled={isPending}>
        {isPending ? "Enviando voto" : "Enviar voto"}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});
