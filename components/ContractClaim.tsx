import { ContractClaimData } from "lib/contract-utils"
import { ContractSubmit } from "./ContractSubmit"
import contractStyles from "../styles/Contract.module.css";

interface ContractClaimProps {
    contractData: ContractClaimData;
    cantTransactMsg: string;
    redeemerInputs?: JSX.Element
}

export const ContractClaim = ({ contractData, cantTransactMsg, redeemerInputs }: ContractClaimProps) => {
    return (<div className={`${contractStyles["contract-action"]} ${contractStyles.claim}`}>
        <h2
            className={`${contractStyles["title"]}`}
        >
            Claim
        </h2>
        {redeemerInputs}
        <div className="text-left my-8">
            <ContractSubmit
                buttonText="Claim"
                contractData={contractData}
                cantTransactMsg={cantTransactMsg}
            />
        </div>
    </div>)
}