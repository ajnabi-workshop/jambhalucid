import { Address, Datum, Script } from "lucid-cardano";
import { useCallback, useState } from "react";
import { useCardano } from "use-cardano";

export const useContractLock = (
  scriptRef: Script,
  scriptAddress: Address,
  datum: Datum
) => {
  const { isValid, lucid } = useCardano();
  const [successMessage, setSuccessMessage] = useState<string>();
  const [error, setError] = useState<Error | undefined>();
  const [lovelace, setLovelace] = useState(0n);

  const lockUTxO = useCallback(async () => {
    if (!lucid || !lovelace) return;

    try {
      const tx = await lucid
        .newTx()
        .payToContract(
          scriptAddress,
          {
            inline: datum,
            scriptRef,
          },
          {
            lovelace,
          }
        )
        .complete();

      const signedTx = await tx.sign().complete();
      const txHash = await signedTx.submit();

      setLovelace(0n);
      setSuccessMessage(`Transaction submitted with hash ${txHash}`);
    } catch (e) {
      // if (e instanceof Error) setError(e);
      // else console.error(e);
      setError(e as Error);
      console.error(e);
    }
  }, [lucid, lovelace, scriptRef, scriptAddress]);

  const lovelaceSetter = useCallback((value: string) => {
    setError(undefined);
    setSuccessMessage(undefined);

    const parsed = parseInt(value);
    if (isNaN(parsed)) return;
    setLovelace(BigInt(parsed));
  }, []);

  return {
    error,
    successMessage,
    lovelace,
    setLovelace: lovelaceSetter,
    lockUTxO,
    canTransact: isValid && lovelace > 0,
  };
};