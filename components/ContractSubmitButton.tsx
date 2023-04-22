import { LoadingButton } from "@mui/lab";
import { ContractActionData } from "lib/contract-utils";

interface LoadingButtonProps {
  contractData: ContractActionData;
  text: string;
}

export default function ContractSubmitButton({
  contractData,
  text,
}: LoadingButtonProps) {
  return (
    <LoadingButton
      variant="outlined"
      color="primary"
      disabled={!contractData.canTransact}
      loading={contractData.isLoading}
      onClick={contractData.handleSubmit}
    >
      <span>{text}</span>
    </LoadingButton>
  );
}
