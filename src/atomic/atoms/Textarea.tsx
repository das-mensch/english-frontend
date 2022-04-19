type TextareaProps = {
  value?: string;
  onInput?: (text: string) => void
}

export const Textarea = (props: TextareaProps) => {
  const { value, onInput } = props;
  return (
    <textarea value={value} onInput={(evt) => onInput !== undefined && onInput(evt.currentTarget.value) }></textarea>
  )
}
