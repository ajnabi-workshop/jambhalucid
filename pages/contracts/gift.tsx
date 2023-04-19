import { Address, Constr, Data, Datum, Script } from 'lucid-cardano'
import { useEffect, useMemo, useState } from 'react'
import { importScript } from 'lib/script-utils'
import { Inter } from "@next/font/google"
import { useCardano } from 'use-cardano'
import { useContractLock } from 'hooks/use-contract-lock'
import { useContractClaim } from 'hooks/use-contract-claim'
import ContractLoadingButton from 'components/ContractLoadingButton'

const inter = Inter({ subsets: ["latin"] })

interface ContractProps {
  scriptName: string,
}

interface ContractLockProps {
  script: Script,
  scriptAddress: Address
}

export default function Gift() {
  console.log("gift component rendered")
  return (<>
    <Contract scriptName="gift" />
  </>)
}

function Contract({ scriptName }: ContractProps) {
  const { lucid } = useCardano()
  const [script, setScript] = useState<Script | undefined>()
  const scriptAddress: Address | undefined = useMemo((() => {
    return (lucid && script) ? lucid.utils.validatorToAddress(script) : undefined
  }), [lucid, script])
  useEffect(() => {
    (async function () {
      try {
        setScript(await importScript(scriptName))
      } catch (error) {
        console.error(error);
      }
    })()
  }, [])
  if (script && scriptAddress) {
    return (<>
      <LockUTxO script={script} scriptAddress={scriptAddress} />
      <ClaimUTxO script={script} scriptAddress={scriptAddress} />
    </>)
  }
  return (<>
    <p>Script '{scriptName}' not found!</p>
  </>)

}

function LockUTxO({ script, scriptAddress }: ContractLockProps) {
  const { isValid, hideToaster, showToaster } = useCardano()
  const tx = useContractLock(script, scriptAddress, Data.void())
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = () => {
    setIsLoading(true)
    tx.lockUTxO()
  }

  useEffect(() => {
    if (tx.successMessage || tx.error) {
      setIsLoading(false)
    }
  }, [tx.successMessage, tx.error])

  useEffect(() => {
    if (!tx.successMessage) {
      hideToaster
    } else {
      showToaster("Success!", tx.successMessage)
    }
  }, [tx.successMessage, hideToaster, showToaster])

  return (
    <div className="text-center max-w-4xl m-auto text-gray-900 dark:text-gray-100">
      <h1
        style={inter.style}
        className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl"
      >
        Make Gift
      </h1>

      <div style={inter.style} className="my-4 text-center">
        Lock a gift at the "always succeeds" script address
      </div>

      <div className="text-left my-8">
        <div className="my-4">
          <label className="flex flex-col w-40">
            <span className="text-sm lowercase mb-1">Lovelace</span>

            <input
              className="rounded py-1 px-2 text-gray-800 border"
              type="number"
              min="0"
              step="1000000"
              name="amount"
              value={Number(tx.lovelace)}
              onChange={(e) => tx.setLovelace(e.target.value?.toString())}
            />
          </label>
        </div>

        <div className="my-4">
          <ContractLoadingButton
            disabled={!tx.canTransact}
            loading={isLoading}
            onClick={handleClick}
            text="Send Gift" />


          <div className="italic">
            {isValid === false ? (
              <p>
                <small>connect a wallet to send a transaction</small>
              </p>
            ) : !tx.successMessage && !tx.error && !tx.canTransact ? (
              <p>
                <small>specify a lovelace amount to send a transaction</small>
              </p>
            ) : tx.error ? (
              <p>
                <small>{tx.error.message}</small>
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

function ClaimUTxO({ script, scriptAddress }: ContractLockProps) {
  const { isValid, hideToaster, showToaster } = useCardano()
  const tx = useContractClaim(script, scriptAddress, Data.void(), Data.void())
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = () => {
    setIsLoading(true)
    tx.claimUTxO()
  }

  useEffect(() => {
    if (tx.successMessage || tx.error) {
      setIsLoading(false)
    }
  }, [tx.successMessage, tx.error])

  useEffect(() => {
    if (!tx.successMessage) {
      hideToaster
    } else {
      showToaster("Success!", tx.successMessage)
    }
  }, [tx.successMessage, hideToaster, showToaster])

  return (
    <div className="text-center max-w-4xl m-auto text-gray-900 dark:text-gray-100">
      <h1
        style={inter.style}
        className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl"
      >
        Claim Gift
      </h1>

      <div style={inter.style} className="my-4 text-center">
        Claim a gift from the "always succeeds" script address
      </div>

      <div className="text-left my-8">
        <div className="my-4">
          <ContractLoadingButton
            disabled={!tx.canTransact}
            loading={isLoading}
            onClick={handleClick}
            text="Claim Gift" />

          <div className="italic">
            {isValid === false ? (
              <p>
                <small>connect a wallet to send a transaction</small>
              </p>
            ) : !tx.successMessage && !tx.error && !tx.canTransact ? (
              <p>
                <small>specify a lovelace amount to send a transaction</small>
              </p>
            ) : tx.error ? (
              <p>
                <small>{tx.error.message}</small>
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}