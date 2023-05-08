import { Inter } from "@next/font/google";
import { ContractLockData } from "lib/contract-utils";
import { ContractSubmit } from "./ContractSubmit";
import { LovelaceSetter } from "./LovelaceSetter";

const inter = Inter({ subsets: ["latin"] });

interface ContractLockProps {
    contractData: ContractLockData;
    cantTransactMsg: string;
    datumInputs?: JSX.Element;
}

export const ContractLock = ({ contractData, cantTransactMsg, datumInputs }: ContractLockProps) => {
    return (
        <div>
            <h2
                style={inter.style}
                className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl"
            >
                Lock
            </h2>
            {datumInputs}
            <div className="text-left my-8">
                <LovelaceSetter contractData={contractData} />
                <ContractSubmit
                    buttonText="Send"
                    contractData={contractData}
                    cantTransactMsg={cantTransactMsg}
                />
            </div>
        </div>
    );
}