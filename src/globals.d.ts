interface SolanaProvider {
  isPhantom: boolean;
  publicKey: PublicKey;
  connect: () => Promise<{ publicKey: PublicKey }>;
  disconnect: () => Promise<void>;
  signAndSendTransaction: (
    transaction: Transaction
  ) => Promise<{ signature: string }>;
}

declare global {
  interface Window {
    phantom?: {
      solana?: {
        [x: string]: any;
        isPhantom?: boolean;
        connect(): Promise<{ publicKey: string }>;
        publicKey: string;
      };
    };
  }
}

export {};
