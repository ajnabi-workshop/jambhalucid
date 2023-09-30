import { MintData, MintMode, TokenType } from "lib/contract-utils"
import { ContractSubmit } from "./ContractSubmit"
import contractStyles from "../styles/Contract.module.css";
import { MintQuantitySetter } from "./MintQuantitySetter";

interface MintProps {
  contractData: MintData;
  cantTransactMsg: string;
  mintInputs?: JSX.Element;
  redeemerInputs?: JSX.Element;
}

export const Mint = ({ contractData, cantTransactMsg, mintInputs, redeemerInputs }: MintProps) => {
  const minting = contractData.mintMode === MintMode.Minting
  const actionStr = minting ? "Mint" : "Burn"
  return (<div className={`${contractStyles["contract-action"]} ${minting ? contractStyles.mint : contractStyles.burn}`}>
    <h2
      className={`${contractStyles["title"]}`}
    >
      {actionStr}
    </h2>
    {mintInputs}
    {redeemerInputs}
    <div className="text-left my-8">
      {/* display quantity setter only for fungible tokens */}
      {contractData.tokenType === TokenType.Fungible && <MintQuantitySetter contractData={contractData} />}
      <ContractSubmit
        buttonText={actionStr}
        contractData={contractData}
        cantTransactMsg={cantTransactMsg}
      />
    </div>
  </div>)
}