import { importScript } from "lib/contract-utils";
import { Address, Script } from "lucid-cardano";
import { useEffect, useMemo, useState } from "react";
import { useCardano } from "use-cardano";

export type ContractActionComponent = (props: ContractActionProps) => JSX.Element;

interface ContractProps {
  scriptName: string;
  title: string;
  description: string;
  LockComponent: ContractActionComponent;
  ClaimComponent: ContractActionComponent;
}

export interface ContractActionProps {
  script: Script;
  scriptAddress: Address;
}

export function Contract({
  scriptName,
  title,
  description,
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

  const ContractActions = () => {
    if (script && scriptAddress) {
      return (
        <>
          <LockComponent script={script} scriptAddress={scriptAddress} />
          <ClaimComponent script={script} scriptAddress={scriptAddress} />
        </>
      );
    }
    else {
      return (
        <>
          <p>Script '{scriptName}' not found!</p>
        </>
      );
    }
  }

  return (
    <div className="text-center max-w-4xl m-auto text-gray-900 dark:text-gray-100">
      <h1>{title}</h1>
      <p>{description}</p>
      {!lucid ? (<p>Connect to a supported Cardano wallet to interact with the contract.</p>) : (<ContractActions />)}
    </div>
  )
}