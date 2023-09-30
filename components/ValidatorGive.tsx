import { ValidatorGiveData } from "lib/contract-utils";
import { ContractSubmit } from "./ContractSubmit";
import { LovelaceSetter } from "./LovelaceSetter";
import contractStyles from "../styles/Contract.module.css";

interface ValidatorGiveProps {
  contractData: ValidatorGiveData;
  cantTransactMsg: string;
  datumInputs?: JSX.Element;
}

export const ValidatorGive = ({ contractData, cantTransactMsg, datumInputs }: ValidatorGiveProps) => {
  return (
    <div className={`${contractStyles["contract-action"]} ${contractStyles.give}`}>
      <h2
        className={`${contractStyles["title"]}`}
      >
        Give
      </h2>
      {datumInputs}
      <div className="text-left my-8">
        <LovelaceSetter contractData={contractData} />
        <ContractSubmit
          buttonText="Give"
          contractData={contractData}
          cantTransactMsg={cantTransactMsg}
        />
      </div>
    </div>
  );
}