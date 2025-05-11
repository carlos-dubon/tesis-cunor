import "@walletconnect/react-native-compat";
import { Assets as NavigationAssets } from "@react-navigation/elements";
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import { Navigation } from "./navigation";
import Toast from "react-native-toast-message";
Asset.loadAsync([
  ...NavigationAssets,
  require("./assets/newspaper.png"),
  require("./assets/bell.png"),
]);

// 1. Get projectId from https://cloud.reown.com
const projectId = "b13c7ed91d5d502488987dc7bd8c2e84";

import { WagmiProvider } from "wagmi";
import { mainnet, sepolia } from "@wagmi/core/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createAppKit,
  defaultWagmiConfig,
  AppKit,
} from "@reown/appkit-wagmi-react-native";

// 0. Setup queryClient
const queryClient = new QueryClient();

// 2. Create config
const metadata = {
  name: "AppKit RN",
  description: "AppKit RN Example",
  url: "https://reown.com/appkit",
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
  redirect: {
    native: "tesiscunor://",
  },
};

const chains = [mainnet, sepolia] as const;

export const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// 3. Create modal
createAppKit({
  projectId,
  wagmiConfig,
  defaultChain: mainnet, // Optional
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

export function App() {
  return (
    <>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
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
          <Toast />
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}
