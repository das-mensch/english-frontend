import styled from "styled-components";

const StyledTextArea = styled.textarea`
  font-family: inherit;
`;

type TextareaProps = {
  value?: string;
  onInput?: (text: string) => void
}

export const Textarea = (props: TextareaProps) => {
  const { value, onInput } = props;
  return (
    <StyledTextArea value={value} onInput={(evt) => onInput !== undefined && onInput(evt.currentTarget.value) }></StyledTextArea>
  )
}
