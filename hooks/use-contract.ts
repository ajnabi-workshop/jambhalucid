import { useEffect, useState } from "react";
import { useCardano } from "use-cardano";

export const useContract = () => {
  const { hideToaster, showToaster } = useCardano()
  const [successMessage, setSuccessMessage] = useState<string>();
  const [error, setError] = useState<Error | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (successMessage || error) {
      setIsLoading(false)
    }
    if (successMessage) {
      showToaster("Success!", successMessage)
    } else {
      hideToaster()
    }
  }, [successMessage, error, setIsLoading, hideToaster, showToaster])

  return {
    error,
    isLoading,
    setError,
    setIsLoading,
    setSuccessMessage,
    successMessage,
  }
}