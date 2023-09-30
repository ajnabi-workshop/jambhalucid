import { useValidatorGive } from "hooks/use-validator-give";
import { useValidatorGrab } from "hooks/use-validator-grab";
import { Contract, ContractActionProps } from "components/Contract";
import { Data } from "lucid-cardano";
import { useEffect } from "react";
import { ValidatorGrab } from "components/ValidatorGrab";
import { ValidatorGive } from "components/ValidatorGive";

export default function Gift() {
  return (
    <>
      <Contract
        scriptName="gift"
        title='Gift Contract'
        description="The simplest possible contract, in which locked UTxOs can be claimed by anyone."
        actionComponents={[Give, Grab]}
      />
    </>
  );
}

function Give({ script }: ContractActionProps) {
  const contractData = useValidatorGive(script);
  const cantTransactMsg = "Enter a positive value in lovelace to send a gift";
  useEffect(() => {
    contractData.setDatum(Data.void())
  }, [contractData])
  return (<ValidatorGive contractData={contractData} cantTransactMsg={cantTransactMsg} />);
}

function Grab({ script }: ContractActionProps) {
  const contractData = useValidatorGrab(script);
  const cantTransactMsg = "";
  useEffect(() => {
    contractData.setDatum(Data.void())
    contractData.setRedeemer(Data.void())
  }, [contractData])
  return (
    <ValidatorGrab
      contractData={contractData}
      cantTransactMsg={cantTransactMsg}
    />)
}
