import { LoadingButton } from "@mui/lab";
import { ContractData } from "lib/contract-utils";
import contractStyles from "../styles/Contract.module.css";

interface LoadingButtonProps {
  contractData: ContractData;
  text: string;
}

export default function ContractSubmitButton({
  contractData,
  text,
}: LoadingButtonProps) {
  return (
    <LoadingButton
      // variant="outlined"
      // color="primary"
      disabled={!contractData.canTransact}
      loading={contractData.isLoading}
      onClick={contractData.handleSubmit}
      className={contractStyles["contract-submit"]}
    >
      <span>{text}</span>
    </LoadingButton>
  );
}
