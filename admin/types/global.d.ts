import { EthereumProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }

  interface globalThis {
    ethereum?: EthereumProvider;
  }
}
