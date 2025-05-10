import React, { useState } from "react";
import { Alert, View, StyleSheet } from "react-native";
import { Button, Text } from "@react-navigation/elements";
import {
  useAppKitProvider,
  useAppKitAccount,
  AppKitButton,
} from "@reown/appkit-ethers-react-native";
import { BrowserProvider, Contract, JsonRpcSigner } from "ethers";
import { compiledContract } from "../../compiledContact/compiledContact";

const contractAddress = "0x8604415a6Bd5b609218d5C5B014c1E3d7dAD86Dd";

export function Home() {
  const { walletProvider } = useAppKitProvider();
  const { isConnected, address } = useAppKitAccount();
  const [isLoading, setIsLoading] = useState(false);

  const handleVote = async () => {
    if (!isConnected || !walletProvider || !address) {
      Alert.alert("Wallet not connected");
      return;
    }

    setIsLoading(true);

    try {
      console.log("walletProvider:", walletProvider);

      const provider = new BrowserProvider(walletProvider);

      const signer = new JsonRpcSigner(provider, address);

      const contract = new Contract(
        contractAddress,
        compiledContract.abi,
        signer
      );

      const candidateDpi = "1"; // Replace with actual candidate DPI
      const voterDpi = "123"; // Replace with actual voter DPI (from user input or context)

      const tx = await contract.castVote(candidateDpi, voterDpi);
      await tx.wait(); // Wait for the transaction to be mined

      Alert.alert("Voto enviado exitosamente");
    } catch (e) {
      console.error(e);
      Alert.alert("Error al enviar el voto");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <AppKitButton />
      <Button onPress={handleVote} disabled={isLoading}>
        {isLoading ? "Enviando voto" : "Enviar voto"}
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
