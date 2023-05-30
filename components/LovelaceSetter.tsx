import { FormControl, FormHelperText, Input, InputLabel } from "@mui/material";
import { ContractLockData } from "lib/contract-utils";

type LovelaceSetterProps = {
  contractData: ContractLockData;
};

export function LovelaceSetter({ contractData }: LovelaceSetterProps) {
  return (
    <div className="my-4">
      <FormControl>
        <InputLabel htmlFor="amount">Amount</InputLabel>
        <Input
          id="amount"
          aria-describedby="amount-helper-text"
          type="number"
          inputProps={{ min: 0, step: 1000000 }}
          value={Number(contractData.lovelace)}
          onChange={(e) =>
            contractData.setLovelace(e.target.value?.toString())
          } />
        <FormHelperText id="amount-helper-text">Enter the amount in lovelace</FormHelperText>
      </FormControl>
    </div>
  );
}
