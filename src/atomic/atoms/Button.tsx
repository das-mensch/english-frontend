import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  font-family: inherit;
`;

type ButtonProps = {
  onClick: () => void;
  isDisabled?: boolean;
  text: string
}

export const Button = (props: ButtonProps) => {
  const { onClick, text, isDisabled } = props;
  return (
    <StyledButton disabled={isDisabled} onClick={() => onClick()}>{text}</StyledButton>
  );
};
