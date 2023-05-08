import { useCallback, useState } from "react";
import { Address, Script } from "lucid-cardano";
import { useCardano } from "use-cardano";
import { useContract } from "./use-contract";
import { ContractLockData, mkLoadingClickHandler } from "lib/contract-utils";

export const useContractLock = (
  scriptRef: Script,
  scriptAddress: Address
): ContractLockData => {
  const { isValid, lucid } = useCardano();
  const {
    error,
    isLoading,
    setError,
    setIsLoading,
    setSuccessMessage,
    successMessage,
  } = useContract();
  const [lovelace, setLovelace] = useState(0n);
  const [datum, setDatum] = useState<string | undefined>();

  const lockUTxO = useCallback(async () => {
    if (!lucid || !lovelace) return;

    try {
      const tx = await lucid
        .newTx()
        .payToContract(
          scriptAddress,
          {
            inline: datum,
            // scriptRef,
          },
          {
            lovelace,
          }
        )
        .complete();
      console.log(tx.txComplete.to_json())
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
  }, [lucid, lovelace, scriptRef, scriptAddress, datum]);

  const lovelaceSetter = useCallback((value: string) => {
    setError(undefined);
    setSuccessMessage(undefined);

    const parsed = parseInt(value);
    return !isNaN(parsed) ? setLovelace(BigInt(parsed)) : undefined;
  }, []);

  return {
    canTransact: isValid && lovelace > 0,
    datum,
    error,
    handleSubmit: mkLoadingClickHandler(setIsLoading, lockUTxO),
    isLoading,
    lovelace,
    setDatum,
    setError,
    setIsLoading,
    setLovelace: lovelaceSetter,
    setSuccessMessage,
    successMessage,
  };
};
