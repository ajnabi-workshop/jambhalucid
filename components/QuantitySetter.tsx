import { FormControl, FormHelperText, Input, InputLabel } from "@mui/material";

type QuantitySetterProps = {
  helperText: string;
  quantity: bigint;
  setQuantity: (value: string) => void;
  step: number;
};

export function QuantitySetter({ helperText, quantity, setQuantity, step }: QuantitySetterProps) {
  return (
    <div className="my-4">
      <FormControl>
        <InputLabel htmlFor="amount">Amount</InputLabel>
        <Input
          id="amount"
          aria-describedby="amount-helper-text"
          type="number"
          inputProps={{ min: 0, step }}
          value={Number(quantity)}
          onChange={(e) =>
            setQuantity(e.target.value?.toString())
          } />
        <FormHelperText id="amount-helper-text">{helperText}</FormHelperText>
      </FormControl>
    </div>
  );
}
