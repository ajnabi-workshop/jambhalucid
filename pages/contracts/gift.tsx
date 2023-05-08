import { useContractLock } from "hooks/use-contract-lock";
import { useContractClaim } from "hooks/use-contract-claim";
import { Contract, ContractActionProps } from "components/Contract";
import { Inter } from "@next/font/google";
import { Data } from "lucid-cardano";
import { useEffect } from "react";
import { ContractClaim } from "components/ContractClaim";
import { ContractLock } from "components/ContractLock";

const inter = Inter({ subsets: ["latin"] });

export default function Gift() {
  return (
    <>
      <Contract
        scriptName="gift"
        title='Gift ("Always Succeeds") Contract'
        description="The simplest possible contract, in which locked UTXOs can be claimed by anyone."
        LockComponent={LockUTxO}
        ClaimComponent={ClaimUTxO}
      />
    </>
  );
}

function LockUTxO({ script, scriptAddress }: ContractActionProps) {
  const contractData = useContractLock(script, scriptAddress);
  const cantTransactMsg = "TODO: replace with correct message";
  useEffect(() => {
    contractData.setDatum(Data.void())
  })
  return (<ContractLock contractData={contractData} cantTransactMsg={cantTransactMsg} />);
}

function ClaimUTxO({ script, scriptAddress }: ContractActionProps) {
  const contractData = useContractClaim(script, scriptAddress);
  const cantTransactMsg = "TODO: replace with correct message";
  useEffect(() => {
    contractData.setDatum(Data.void())
    contractData.setRedeemer(Data.void())
  })
  return (
    <ContractClaim
      contractData={contractData}
      cantTransactMsg={cantTransactMsg}
    />)
}
