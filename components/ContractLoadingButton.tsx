import { LoadingButton } from "@mui/lab"

interface LoadingButtonProps {
  disabled: boolean,
  loading: boolean,
  onClick: any,
  text: string
}

export default function ContractLoadingButton({disabled, loading, onClick, text}: LoadingButtonProps) {
  return (<LoadingButton
    variant="outlined"
    color="primary"
    disabled={disabled}
    loading={loading}
    onClick={onClick}>
    <span>{text}</span>
  </LoadingButton>)
}