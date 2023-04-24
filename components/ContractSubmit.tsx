import { ContractActionData } from "lib/contract-utils";
import { ContractError } from "./ContractError";
import ContractSubmitButton from "./ContractSubmitButton";

interface ContractSubmitProps {
  buttonText: string;
  cantTransactMsg: string;
  contractData: ContractActionData;
}

export function ContractSubmit({
  buttonText,
  cantTransactMsg,
  contractData,
}: ContractSubmitProps) {
  return (
    <div className="my-4">
      <ContractSubmitButton contractData={contractData} text={buttonText} />
      <ContractError
        cantTransactMsg={cantTransactMsg}
        contractData={contractData}
      />
    </div>
  );
}
