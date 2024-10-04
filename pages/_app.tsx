import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Sepolia } from "@thirdweb-dev/chains";
import { ThirdwebProvider } from "@thirdweb-dev/react";

const activeChain = Sepolia;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      activeChain={activeChain}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}
