import { ValidatorGrabData } from "lib/contract-utils"
import { ContractSubmit } from "./ContractSubmit"
import contractStyles from "../styles/Contract.module.css";

interface ValidatorGrabProps {
  contractData: ValidatorGrabData;
  cantTransactMsg: string;
  redeemerInputs?: JSX.Element
}

export const ValidatorGrab = ({ contractData, cantTransactMsg, redeemerInputs }: ValidatorGrabProps) => {
  return (<div className={`${contractStyles["contract-action"]} ${contractStyles.grab}`}>
    <h2
      className={`${contractStyles["title"]}`}
    >
      Grab
    </h2>
    {redeemerInputs}
    <div className="text-left my-8">
      <ContractSubmit
        buttonText="Grab"
        contractData={contractData}
        cantTransactMsg={cantTransactMsg}
      />
    </div>
  </div>)
}