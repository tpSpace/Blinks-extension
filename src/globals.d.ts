export interface Phantom {
  solana: {
    isPhantom: boolean;
    connect: () => Promise<{ publicKey: { toString: () => string } }>;
  };
}

export declare global {
  interface Window {
    phantom?: Phantom;
  }
}
