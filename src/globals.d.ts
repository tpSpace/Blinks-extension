interface SolanaProvider {
  isPhantom: boolean;
  connect: () => Promise<{ publicKey: { toString: () => string } }>;
  disconnect: () => Promise<void>;
  signTransaction: (transaction: { message: string }) => Promise<string>;
  send: (method: string, params: any) => Promise<any>;
}

declare global {
  interface Window {
    phantom?: {
      solana?: {
        connect(): unknown;
        isPhantom?: boolean;
      };
    };
  }
}

export {};
