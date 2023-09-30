import { MintData } from "lib/contract-utils";
import { QuantitySetter } from "components/QuantitySetter"

type MintQuantitySetterProps = {
  contractData: MintData;
};

export function MintQuantitySetter({ contractData }: MintQuantitySetterProps) {
  return (
    <QuantitySetter
      helperText="Enter the asset amount"
      quantity={contractData.quantity}
      setQuantity={contractData.setQuantity}
      step={1}
    />
  );
}
