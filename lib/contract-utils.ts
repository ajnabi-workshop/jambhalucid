import { Address, Datum, Json, Lucid, Script, ScriptType, UTxO } from "lucid-cardano";
import { Dispatch, SetStateAction } from "react";

interface ScriptImport {
  type: "PlutusScriptV1" | "PlutusScriptV2";
  cborHex: string;
}

export async function importScript(scriptName: string): Promise<Script> {
  const response = await fetch(`../scripts/${scriptName}.plutus`);
  const { type, cborHex } = (await response.json()) as ScriptImport;
  const lucidScriptType: ScriptType =
    type === "PlutusScriptV1" ? "PlutusV1" : "PlutusV2";
  return { type: lucidScriptType, script: cborHex };
}

function sortUTxOsDesc(utxos: UTxO[]) {
  return utxos.sort(
    ({ assets: { lovelace: l1 } }, { assets: { lovelace: l2 } }) =>
      l1 > l2 ? -1 : 1
  );
}

export async function selectHighestValidUTxO(
  lucid: Lucid,
  scriptAddress: Address,
  datum: Datum
): Promise<UTxO> {
  const utxos = await lucid.utxosAt(scriptAddress);
  const validUTxOs = utxos.filter(
    (u) => u.datum === datum || u.datumHash === lucid.utils.datumToHash(datum)
  );
  if (validUTxOs.length === 0) {
    throw new Error("No valid UTXOs available");
  }
  return sortUTxOsDesc(validUTxOs)[0];
}

export interface ContractData {
  canTransact: boolean | undefined;
  error: Error | undefined;
  handleSubmit: () => void;
  isLoading: boolean;
  setError: Dispatch<SetStateAction<Error | undefined>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setSuccessMessage: Dispatch<SetStateAction<string | undefined>>;
  successMessage: string | undefined;
}

export interface ValidatorActionData extends ContractData {
  datum: string | undefined;
  setDatum: Dispatch<SetStateAction<string | undefined>>;
}

export interface ValidatorGiveData extends ValidatorActionData {
  lovelace: bigint;
  setLovelace: (value: string) => void;
}

export interface ValidatorGrabData extends ValidatorActionData {
  redeemer: string | undefined;
  setRedeemer: Dispatch<SetStateAction<string | undefined>>;
}

export enum MintMode {
  Minting = "Minting",
  Burning = "Burning"
}

export enum TokenType {
  Fungible = "Fungible",
  NonFungible = "NonFungible"
}

export interface MintData extends ContractData {
  metadata: Json | undefined;
  mintMode: MintMode;
  quantity: bigint;
  redeemer: string | undefined;
  setMetadata: Dispatch<SetStateAction<Json | undefined>>;
  setQuantity: (value: string) => void;
  setRedeemer: Dispatch<SetStateAction<string | undefined>>;
  setTokenName: (value: string) => void;
  tokenName: string;
  tokenType: TokenType;
}

export const mkLoadingClickHandler =
  (setIsLoading: Dispatch<SetStateAction<boolean>>, callback: () => void) =>
    () => {
      setIsLoading(true);
      callback();
    };
