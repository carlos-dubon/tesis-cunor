import React, { useState } from "react";
import { Alert, View, StyleSheet } from "react-native";
import { Button, Text } from "@react-navigation/elements";
import {
  useAppKitProvider,
  useAppKitAccount,
  ConnectButton,
} from "@reown/appkit-ethers-react-native";
import { BrowserProvider, Contract, JsonRpcSigner } from "ethers";
import { compiledContract } from "../../compiledContact/compiledContact";

export function Home() {
  const { walletProvider } = useAppKitProvider();
  const { isConnected, address } = useAppKitAccount();
  const [isLoading, setIsLoading] = useState(false);

  const handleVote = async () => {
    if (!isConnected || !walletProvider || !address) {
      Alert.alert("Wallet not connected");
      return;
    }

    try {
      setIsLoading(true);
      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = new JsonRpcSigner(ethersProvider, address);

      const contract = new Contract(
        "0xe78412B4c576aaCE0AdD8B4e3a5E28Cc4525cA92",
        compiledContract.abi,
        signer
      );

      const candidateDpi = "123456789";
      const voterDpi = "987654321";

      const tx = await contract.castVote(candidateDpi, voterDpi);
      await tx.wait();

      Alert.alert("Success", "Vote has been cast!");
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to cast vote");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button onPress={handleVote} disabled={isLoading}>
        {isLoading ? "Casting vote..." : "Cast Vote"}
      </Button>
      <ConnectButton label="Conectar wallet" loadingLabel="Cargando..." />
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
