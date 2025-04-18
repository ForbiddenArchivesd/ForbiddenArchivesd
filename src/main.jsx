import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets'

// Import Solana wallet adapter styles
import '@solana/wallet-adapter-react-ui/styles.css'

// Set up wallet configuration
const wallets = [new PhantomWalletAdapter()]

// Use environment variable with fallback to the Helius RPC endpoint
const endpoint = import.meta.env.VITE_SOLANA_RPC_ENDPOINT || "https://mainnet.helius-rpc.com/?api-key=4fb05a4e-b999-4375-b303-6d4a57ad32d4";
console.log("Using Solana RPC endpoint:", endpoint);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect={false}>
        <WalletModalProvider>
          <App />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  </React.StrictMode>,
)
