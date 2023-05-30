import { ContractLockData } from "lib/contract-utils";
import { ContractSubmit } from "./ContractSubmit";
import { LovelaceSetter } from "./LovelaceSetter";
import contractStyles from "../styles/Contract.module.css";

interface ContractLockProps {
    contractData: ContractLockData;
    cantTransactMsg: string;
    datumInputs?: JSX.Element;
}

export const ContractLock = ({ contractData, cantTransactMsg, datumInputs }: ContractLockProps) => {
    return (
        <div className={`${contractStyles["contract-action"]} ${contractStyles.lock}`}>
            <h2
                className={`${contractStyles["title"]}`}
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