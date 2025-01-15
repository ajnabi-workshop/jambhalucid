import { useCallback, useState } from "react";
import { Script } from "lucid-cardano";
import { useCardano } from "use-cardano";
import { useContract } from "./use-contract";
import { ValidatorGiveData, mkLoadingClickHandler } from "lib/contract-utils";

export const useValidatorGive = (
  script: Script
): ValidatorGiveData => {
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

  const give = useCallback(async () => {
    if (!lucid || !lovelace) return;
    const scriptAddress = lucid.utils.validatorToAddress(script);

    try {
      const tx = await lucid
        .newTx()
        .payToContract(
          scriptAddress,
          {
            inline: datum,
            // scriptRef: script,
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
  }, [lucid, lovelace, script, datum]);

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
    handleSubmit: mkLoadingClickHandler(setIsLoading, give),
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
