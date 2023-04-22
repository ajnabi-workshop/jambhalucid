import { ContractActionData } from "lib/tx-utils";
import { useCardano } from "use-cardano";

type ContractErrorProps = {
  cantTransactMsg: string;
  contractData: ContractActionData;
};

export function ContractError({
  cantTransactMsg,
  contractData,
}: ContractErrorProps) {
  const { isValid } = useCardano();
  const { canTransact, error, successMessage } = contractData;
  return (
    <div className="italic">
      {isValid === false ? (
        <p>
          <small>Connect a wallet to submit a transaction</small>
        </p>
      ) : !successMessage && !error && !canTransact ? (
        <p>
          <small>{cantTransactMsg}</small>
        </p>
      ) : error ? (
        <p>
          <small>{error.message}</small>
        </p>
      ) : null}
    </div>
  );
}
