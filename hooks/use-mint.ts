import { useCallback, useState } from "react";
import { Json, Script, fromText } from "lucid-cardano";
import { useCardano } from "use-cardano";
import { useContract } from "./use-contract";
import {
  MintData,
  MintMode,
  TokenType,
  mkLoadingClickHandler,
} from "lib/contract-utils";

export const useMint = (
  mintMode: MintMode,
  script: Script,
  tokenType: TokenType
): MintData => {
  const { isValid, lucid } = useCardano();
  const {
    error,
    isLoading,
    setError,
    setIsLoading,
    setSuccessMessage,
    successMessage,
  } = useContract();

  const initialQty = tokenType === TokenType.Fungible ? 0n : 1n
  const [tokenName, setTokenName] = useState<string>("");
  const [quantity, setQuantity] = useState(initialQty);
  const [redeemer, setRedeemer] = useState<string | undefined>();
  const [metadata, setMetadata] = useState<Json | undefined>();

  const mint = useCallback(async () => {
    if (!lucid || !tokenName || !quantity) return;
    const policyId = lucid.utils.mintingPolicyToId(script);
    const unit = policyId + fromText(tokenName);
    const q = mintMode === MintMode.Minting ? quantity : -1n * quantity
    try {
      const txDraft = lucid
        .newTx()
        .mintAssets({ [unit]: q }, redeemer)
        .attachMintingPolicy(script);

      // attach NFT metadata if present:
      // metadata && txDraft.attachMetadata(721, metadata);

      const completeTx = await txDraft.complete();
      const signedTx = await completeTx.sign().complete();
      const txHash = await signedTx.submit();
      setQuantity(0n);
      setSuccessMessage(`Transaction submitted with hash ${txHash}`);
    } catch (e) {
      setError(e as Error);
      console.error(e);
    }
  }, [lucid, script, quantity, redeemer, tokenName]);

  const tokenNameSetter = useCallback((value: string) => {
    setError(undefined);
    setSuccessMessage(undefined);
    setTokenName(value);
  }, []);

  const quantitySetter = useCallback((value: string) => {
    setError(undefined);
    setSuccessMessage(undefined);

    const parsed = parseInt(value);
    return !isNaN(parsed) ? setQuantity(BigInt(parsed)) : undefined;
  }, []);

  return {
    canTransact: isValid && quantity > 0 && tokenName !== "",
    error,
    handleSubmit: mkLoadingClickHandler(setIsLoading, mint),
    isLoading,
    metadata,
    mintMode,
    quantity,
    redeemer,
    setError,
    setIsLoading,
    setMetadata,
    setQuantity: quantitySetter,
    setRedeemer,
    setSuccessMessage,
    setTokenName: tokenNameSetter,
    successMessage,
    tokenName,
    tokenType
  };
};
