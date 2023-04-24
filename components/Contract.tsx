import { importScript } from "lib/contract-utils";
import { Address, Script } from "lucid-cardano";
import { useEffect, useMemo, useState } from "react";
import { useCardano } from "use-cardano";

export type ContractActionComponent = (props: ContractActionProps) => JSX.Element;

interface ContractProps {
  scriptName: string;
  LockComponent: ContractActionComponent;
  ClaimComponent: ContractActionComponent;
}

export interface ContractActionProps {
  script: Script;
  scriptAddress: Address;
}

export function Contract({
  scriptName,
  LockComponent,
  ClaimComponent,
}: ContractProps) {
  const { lucid } = useCardano();
  const [script, setScript] = useState<Script | undefined>();

  useEffect(() => {
    (async function () {
      try {
        setScript(await importScript(scriptName));
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const scriptAddress: Address | undefined = useMemo(() => {
    return lucid && script ? lucid.utils.validatorToAddress(script) : undefined;
  }, [lucid, script]);

  if (script && scriptAddress) {
    return (
      <>
        <LockComponent script={script} scriptAddress={scriptAddress} />
        <ClaimComponent script={script} scriptAddress={scriptAddress} />
      </>
    );
  }
  return (
    <>
      <p>Script '{scriptName}' not found!</p>
    </>
  );
}