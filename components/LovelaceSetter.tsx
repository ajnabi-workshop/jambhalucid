import { ValidatorGiveData } from "lib/contract-utils";
import { QuantitySetter } from "components/QuantitySetter"

type LovelaceSetterProps = {
  contractData: ValidatorGiveData;
};

export function LovelaceSetter({ contractData }: LovelaceSetterProps) {
  return (
    <QuantitySetter
      helperText="Enter the amount in lovelace"
      quantity={contractData.lovelace}
      setQuantity={contractData.setLovelace}
      step={1000000}
    />
  );
}
