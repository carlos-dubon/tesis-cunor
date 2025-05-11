import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { AppKitButton } from "@reown/appkit-wagmi-react-native";
import { compiledContract } from "../../compiledContact/compiledContact";
import { readContract, writeContract } from "@wagmi/core";
import { useAccount } from "wagmi";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { wagmiConfig } from "../../App";
import { isValidEthContractAddress } from "../../utils/isValidEthContractAddress";
import Toast from "react-native-toast-message";

// const contractAddress = "0x84625431AA40D960c794ee60C5d9a07255bE6019";

interface CandidateI {
  name: string;
  dpi: string;
}

export function Home() {
  const [contractAddress, setContractAddress] = useState("");
  const { isConnected, address, status } = useAccount();

  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [isLoadingCandidates, setIsLoadingCandidates] = useState(false);
  const [candidates, setCandidates] = useState<CandidateI[] | undefined>(
    undefined
  );

  async function readCandidates(contractAddress: string) {
    try {
      setIsLoadingCandidates(true);
      const result = await readContract(wagmiConfig, {
        address: contractAddress as `0x${string}`,
        abi: compiledContract.abi,
        functionName: "getCandidates",
      });

      setCandidates(result as CandidateI[]);
    } catch (error) {
      console.error("Error reading contract:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: String(error),
      });
      return null;
    } finally {
      setIsLoadingCandidates(false);
    }
  }

  const [dpi, setDpi] = useState("");

  const [isSendingVote, setIsSendingVote] = useState(false);

  const castVote = async () => {
    setIsSendingVote(true);
    try {
      const result = await writeContract(wagmiConfig, {
        address: contractAddress as `0x${string}`,
        abi: compiledContract.abi,
        functionName: "castVote",
        args: [selectedCandidate, dpi],
      });

      Toast.show({
        type: "success",
        text1: "Voto emitido",
        text2: "Tu voto ha sido registrado correctamente",
      });
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: String(error),
      });
    } finally {
      setIsSendingVote(false);
    }
  };

  return (
    <View style={styles.container}>
      <AppKitButton />

      {isConnected ? (
        <>
          <Input
            label="Dirección de la boleta"
            value={contractAddress}
            onChangeText={setContractAddress}
          />
          <Button
            isLoading={isLoadingCandidates}
            disabled={!isValidEthContractAddress(contractAddress)}
            onPress={() => {
              readCandidates(contractAddress);
            }}
          >
            Cargar boleta
          </Button>

          {(candidates?.length ?? 0) > 0 ? (
            <>
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 16,
                }}
              >
                Por favor selecciona un candidato:
              </Text>
              <View
                style={{
                  gap: 16,
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {candidates?.map((c) => (
                  <TouchableOpacity
                    key={c.dpi}
                    onPress={() => setSelectedCandidate(c.dpi)}
                    style={{
                      borderRadius: 8,
                      borderWidth: c.dpi === selectedCandidate ? 2 : 1,
                      borderColor:
                        c.dpi === selectedCandidate ? "#2B7FFF" : "#E5E7EB",
                      width: 100,
                      height: 100,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "600",
                        textAlign: "center",
                      }}
                    >
                      {c.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {selectedCandidate ? (
                <>
                  <Input
                    label="Ingresa tu numero de DPI"
                    value={dpi}
                    onChangeText={setDpi}
                  />
                  <Button
                    onPress={() => castVote()}
                    isLoading={isSendingVote}
                    disabled={!dpi}
                  >
                    Emitir voto
                  </Button>
                </>
              ) : null}
            </>
          ) : null}
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    gap: 16,
    padding: 16,
  },
});
