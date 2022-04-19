type ButtonProps = {
  onClick: () => void;
  isDisabled?: boolean;
  text: string
}

export const Button = (props: ButtonProps) => {
  const { onClick, text, isDisabled } = props;
  return (
    <button disabled={isDisabled} onClick={() => onClick()}>{text}</button>
  )
}
