import { Inter } from "@next/font/google";
import { ContractClaimData } from "lib/contract-utils"
import { ContractSubmit } from "./ContractSubmit"

const inter = Inter({ subsets: ["latin"] });

interface ContractClaimProps {
    contractData: ContractClaimData;
    cantTransactMsg: string;
    redeemerInputs?: JSX.Element
}

export const ContractClaim = ({ contractData, cantTransactMsg, redeemerInputs }: ContractClaimProps) => {
    return (<div>
        <h2
            style={inter.style}
            className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl"
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