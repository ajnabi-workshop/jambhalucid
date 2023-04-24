import { ContractLockData } from "lib/contract-utils";

type LovelaceSetterProps = {
  contractData: ContractLockData;
};

export function LovelaceSetter({ contractData }: LovelaceSetterProps) {
  return (
    <div className="my-4">
      <label className="flex flex-col w-40">
        <span className="text-sm lowercase mb-1">Lovelace</span>

        <input
          className="rounded py-1 px-2 text-gray-800 border"
          type="number"
          min="0"
          step="1000000"
          name="amount"
          value={Number(contractData.lovelace)}
          onChange={(e) =>
            contractData.setLovelace(e.target.value?.toString())
          }
        />
      </label>
    </div>
  );
}
