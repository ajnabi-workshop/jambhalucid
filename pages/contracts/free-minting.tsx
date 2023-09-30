import { Contract, ContractActionProps } from "components/Contract";
import { Data } from "lucid-cardano";
import { ChangeEvent, useEffect } from "react";
import { useMint } from "hooks/use-mint";
import { Mint } from "components/Mint";
import { MintMode, TokenType } from "lib/contract-utils";

export default function FreeMinting() {
  return (
    <>
      <Contract
        scriptName="free-minting"
        title='Free Minting'
        description="TODO: replace with description"
        actionComponents={[Minting, Burning]}
      />
    </>
  );
}

function Minting({ script }: ContractActionProps) {
  const contractData = useMint(MintMode.Minting, script, TokenType.Fungible);
  const cantTransactMsg = "TODO: replace with correct message";
  useEffect(() => {
    contractData.setRedeemer(Data.void())
  }, [contractData])

  return (
    <Mint
      contractData={contractData}
      cantTransactMsg={cantTransactMsg}
      mintInputs={
        <MintInputs
          mintMode={contractData.mintMode}
          tokenName={contractData.tokenName}
          setTokenName={contractData.setTokenName} />
      }
    />
  );
}

function Burning({ script }: ContractActionProps) {
  const contractData = useMint(MintMode.Burning, script, TokenType.Fungible);
  const cantTransactMsg = "TODO: replace with correct message";
  useEffect(() => {
    contractData.setRedeemer(Data.void())
  }, [contractData])

  return (
    <Mint
      contractData={contractData}
      cantTransactMsg={cantTransactMsg}
      mintInputs={
        <MintInputs
          mintMode={contractData.mintMode}
          tokenName={contractData.tokenName}
          setTokenName={contractData.setTokenName} />
      }
    />
  )
}

interface MintInputsProps {
  mintMode: MintMode;
  tokenName: string,
  setTokenName: (value: string) => void;
}

function MintInputs({ mintMode, tokenName, setTokenName }: MintInputsProps) {
  function setName(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value?.toString();
    setTokenName(value);
  }
  const actionStr = mintMode === MintMode.Minting ? "mint" : "burn";
  return (<div className="my-4">
    <label className="flex flex-col w-40">
      <span className="text-sm lowercase mb-1">Token Name</span>
      <input
        className="rounded py-1 px-2 text-gray-800 border"
        name={`${actionStr}-token-name`}
        value={tokenName}
        onChange={setName}
      />
    </label>
  </div>)
}