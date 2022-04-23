import React, { useState } from 'react';
import { Button } from '../atoms/Button';
import { Textarea } from '../atoms/Textarea';

type TextareaWithButtonProps = {
  textAreaContent: string;
  buttonText: string;
  placeholderText: string;
  onButtonClick: (value: string) => void;
  isLoading?: boolean;
}

export const TextareaWithButton = (props: TextareaWithButtonProps) => {
  const { onButtonClick, buttonText, placeholderText, isLoading, textAreaContent } = props;
  const [textAreaValue, setTextAreaValue] = useState(textAreaContent);

  return (
    <>
      <Textarea placeholderText={placeholderText} value={textAreaValue} onInput={newValue => setTextAreaValue(newValue)} />
      <Button isDisabled={isLoading} text={buttonText} onClick={() => onButtonClick(textAreaValue)} />
    </>
  );
};
