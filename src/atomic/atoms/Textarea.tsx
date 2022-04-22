import React from 'react';
import styled from 'styled-components';

const StyledTextArea = styled.textarea`
  font-family: inherit;
`;

type TextareaProps = {
  value?: string;
  placeholderText?: string;
  onInput?: (text: string) => void
}

export const Textarea = (props: TextareaProps) => {
  const { value, onInput, placeholderText } = props;
  return (
    <StyledTextArea placeholder={placeholderText} value={value} onInput={(evt) => onInput !== undefined && onInput(evt.currentTarget.value) }></StyledTextArea>
  );
};
