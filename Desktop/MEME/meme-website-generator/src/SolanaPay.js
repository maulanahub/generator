import { PublicKey, Transaction, SystemProgram } from '@solana/web3.js';

export const requestPayment = async (wallet, connection, amount) => {
  if (!wallet.publicKey) throw new Error('Wallet not connected');

  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: wallet.publicKey,
      toPubkey: new PublicKey('9CtTGfCWpQnyTTxq4wbSfXAcnizU3dBQhvZNBVshKVo7'), // Replace with your wallet address
      lamports: amount * 1e9, // Convert SOL to lamports (1 SOL = 1e9 lamports)
    })
  );

  const signature = await wallet.sendTransaction(transaction, connection);
  await connection.confirmTransaction(signature, 'processed');
  return signature;
};