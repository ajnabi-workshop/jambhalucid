
import "../styles/globals.css"
import "use-cardano/styles/use-cardano.css"
import "../styles/use-cardano-overrides.css"

import type { AppProps } from "next/app"
import { CardanoProvider, CardanoToaster, TestnetNetwork, UseCardanoOptions } from "use-cardano"
import { DefaultLayout } from "layouts/DefaultLayout"
import { StyledEngineProvider } from "@mui/material/styles"

const tnetName = process.env.TESTNET_NAME
const tnetNameCap = tnetName
  ? tnetName.charAt(0).toUpperCase() + tnetName.slice(1).toLowerCase()
  : "Preview"

const options: UseCardanoOptions = {
  allowedNetworks: ["Testnet"],
  testnetNetwork: tnetNameCap as TestnetNetwork,
  node: {
    provider: "blockfrost-proxy",
    proxyUrl: "/api/blockfrost",
  },
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StyledEngineProvider injectFirst>
      <CardanoProvider options={options}>
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>

        <CardanoToaster />
      </CardanoProvider>
    </StyledEngineProvider>
  )
}
