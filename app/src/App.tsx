import "@walletconnect/react-native-compat";
import { Assets as NavigationAssets } from "@react-navigation/elements";
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import { Navigation } from "./navigation";

import {
  createAppKit,
  defaultConfig,
  AppKit,
} from "@reown/appkit-ethers-react-native";

Asset.loadAsync([
  ...NavigationAssets,
  require("./assets/newspaper.png"),
  require("./assets/bell.png"),
]);

// 1. Get projectId from https://cloud.reown.com
const projectId = "b13c7ed91d5d502488987dc7bd8c2e84";

// 2. Create config
const metadata = {
  name: "Votar APP",
  description: "Votar en Blockchain",
  url: "https://reown.com/appkit",
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
  redirect: {
    native: "tesiscunor://",
  },
};

SplashScreen.preventAutoHideAsync();

const config = defaultConfig({ metadata });

// 3. Define your chains
const mainnet = {
  chainId: 1,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "https://etherscan.io",
  rpcUrl: "https://cloudflare-eth.com",
};

const sepolia = {
  chainId: 11155111,
  name: "Sepolia",
  currency: "ETH",
  explorerUrl: "https://sepolia.etherscan.io",
  rpcUrl: "https://sepolia.infura.io/v3/8d3a87cbe9c6401d9910d220b909877c",
};

const chains = [mainnet, sepolia];

// 4. Create modal
createAppKit({
  projectId,
  chains,
  config,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

export function App() {
  return (
    <>
      <Navigation
        linking={{
          enabled: "auto",
          prefixes: [
            // Change the scheme to match your app's scheme defined in app.json
            "tesiscunor://",
          ],
        }}
        onReady={() => {
          SplashScreen.hideAsync();
        }}
      />
      <AppKit />
    </>
  );
}
