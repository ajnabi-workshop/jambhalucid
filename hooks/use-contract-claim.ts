import { selectHighestValidUTxO } from "lib/script-utils";
import { Address, Datum, Redeemer, Script } from "lucid-cardano";
import { useCallback, useState } from "react";
import { useCardano } from "use-cardano";

export const useContractClaim = (
  script: Script,
  scriptAddress: Address,
  datum: Datum,
  redeemer: Redeemer
) => {
  const { isValid, lucid } = useCardano();
  const [successMessage, setSuccessMessage] = useState<string>();
  const [error, setError] = useState<Error | undefined>();

  const claimUTxO = useCallback(async () => {
    if (!lucid) return;

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

      const tx = await txDraft.complete();
      const signedTx = await tx.sign().complete();
      const txHash = await signedTx.submit();

      setSuccessMessage(`Transaction submitted with hash ${txHash}`);
    } catch (e) {
      setError(e as Error);
      console.error(e);
    }
  }, [lucid, script, scriptAddress]);

  return {
    error,
    successMessage,
    claimUTxO,
    canTransact: isValid,
  };
};
