import { Inter } from "@next/font/google";
import { Contract, ContractActionProps } from "components/Contract";
import { ContractClaim } from "components/ContractClaim";
import { ContractLock } from "components/ContractLock";
import { useContractClaim } from "hooks/use-contract-claim";
import { useContractLock } from "hooks/use-contract-lock";
import { Data } from "lucid-cardano";
import { ChangeEvent, useEffect } from "react";

const RedeemSchema = Data.Object({
  guess: Data.Integer(),
});

type Redeem = Data.Static<typeof RedeemSchema>;

const inter = Inter({ subsets: ["latin"] });

export default function CustomTyped() {
  return (
    <>
      <Contract
        scriptName="custom-typed"
        title='Custom-Typed Redeemer ("42") Contract'
        description="TODO: replace with description"
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
  const currentGuess = contractData.redeemer ? Data.from<Redeem>(
    contractData.redeemer,
    RedeemSchema
  ).guess : 0n
  function setGuess(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value?.toString();
    const parsed = parseInt(value);
    if (!isNaN(parsed)) {
      const redeem = Data.to<Redeem>({ guess: BigInt(parsed) }, RedeemSchema);
      contractData.setRedeemer(redeem)
    }
  }
  useEffect(() => {
    contractData.setDatum(Data.void())
  })
  const RedeemerInputs = (): JSX.Element => {
    return (<div className="my-4">
      <label className="flex flex-col w-40">
        <span className="text-sm lowercase mb-1">Guess</span>

        <input
          className="rounded py-1 px-2 text-gray-800 border"
          type="number"
          min="0"
          step="1"
          name="guess"
          value={Number(currentGuess)}
          onChange={setGuess}
        />
      </label>
    </div>)
  }

  return (
    <ContractClaim
      contractData={contractData}
      cantTransactMsg={cantTransactMsg}
      redeemerInputs={<RedeemerInputs />}
    />
  )
}
