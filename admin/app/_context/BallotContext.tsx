"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface BallotContextValue {
  ballotAddress: string;
  setBallotAddress: (value: string) => void;
}

const BallotContext = createContext<BallotContextValue | null>(null);

interface BallotContextProviderProps {
  children: ReactNode;
}

export const BallotContextProvider = (props: BallotContextProviderProps) => {
  const [ballotAddress, setBallotAddress] = useState<string>("");

  return (
    <BallotContext.Provider
      value={{
        ballotAddress,
        setBallotAddress,
      }}
    >
      {props.children}
    </BallotContext.Provider>
  );
};

export const useBallot = () => {
  const context = useContext(BallotContext);

  if (!context) {
    throw new Error("useBallot must be used within a BallotContextProvider");
  }

  return context;
};
