import { Address, Datum, Lucid, Script, ScriptType, UTxO } from "lucid-cardano";

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
