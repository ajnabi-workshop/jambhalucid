import { useCallback, useState } from "react";
import { Script } from "lucid-cardano";
import { useCardano } from "use-cardano";
import { useContract } from "./use-contract";
import {
  ValidatorGrabData,
  mkLoadingClickHandler,
  selectHighestValidUTxO,
} from "lib/contract-utils";

export const useValidatorGrab = (
  script: Script
): ValidatorGrabData => {
  const { isValid, lucid } = useCardano();
  const {
    error,
    isLoading,
    setError,
    setIsLoading,
    setSuccessMessage,
    successMessage,
  } = useContract();
  const [datum, setDatum] = useState<string | undefined>();
  const [redeemer, setRedeemer] = useState<string | undefined>();
  const grab = useCallback(async () => {
    if (!lucid || !datum) return;
    const scriptAddress = lucid.utils.validatorToAddress(script);

    try {
      const utxo = await selectHighestValidUTxO(lucid, scriptAddress, datum);
      const validScriptRef =
        utxo.scriptRef &&
        utxo.scriptRef.type === script.type &&
        utxo.scriptRef.script === script.script;

      const txDraft = lucid.newTx().collectFrom([utxo], redeemer);
      // read reference script if possible, else attach script
      validScriptRef
        ? txDraft.readFrom([utxo])
        : txDraft.attachSpendingValidator(script);

      const completeTx = await txDraft.complete();
      const signedTx = await completeTx.sign().complete();
      const txHash = await signedTx.submit();

      setSuccessMessage(`Transaction submitted with hash ${txHash}`);
    } catch (e) {
      setError(e as Error);
      console.error(e);
    }
  }, [lucid, script, datum, redeemer]);

  return {
    canTransact: isValid,
    datum,
    error,
    handleSubmit: mkLoadingClickHandler(setIsLoading, grab),
    isLoading,
    redeemer,
    setDatum,
    setError,
    setIsLoading,
    setRedeemer,
    setSuccessMessage,
    successMessage,
  };
};
