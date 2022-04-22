import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { checkSentence } from '../../service/checkSentence';
import { ResponseState, ResponseWrapper } from '../../types';
import { TextareaWithButton } from '../molecules/TextareaWithButton';

const skewAnimation = keyframes`
  from {
    transform: skew(0deg, 0deg) scale(1);
  }
  to {
    transform: skew(15deg, 0deg) scale(1.1);
  }
`;

const pendingAnimation = keyframes`
  0% {
    content: "\u00b7";
  }
  50% {
    content: "\u00b7\u00b7";
  }
  100% {
    content: "\u00b7\u00b7\u00b7";
  }
`;

const ChatLayout = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  p.text {
    margin: 0;
    background-color: black;
    color: white;
    border: 0.25rem solid white;
    padding: 1rem;
    transform: skew(-14deg, 2deg);
  }
  p.pending {
    margin: 0;
    width: 1.5rem;
    background-color: #660200;
    color: #a40000;
    padding: 0.25rem 1rem;
    font-size: 2rem;
    transform: rotate(-2deg) skew(-14deg, 2deg);
  }
  p.pending:after {
    content: "";
    animation: ${pendingAnimation} 500ms linear alternate infinite;
  }
`;

const StyledTextAreaWithButton = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  textarea {
    &:focus-visible {
      outline: none;
    }
    border: 0.25rem solid white;
    padding: 1rem;
    background-color: black;
    transform: skew(14deg, 2deg);
    color: white;
    resize: none;
  }
  button {
    background-color: black;
    color: white;
    border: 0.25rem solid white;
    animation: ${skewAnimation} 200ms ease-in-out alternate infinite;
    padding: 0.5rem;
    cursor: pointer;
  }
`;

export const SentenceChecker = () => {
  const [currentSentence, setCurrentSentence] = useState('');
  const [checkResponse, setCheckResponse] = useState<ResponseWrapper<string[]>>({ state: ResponseState.STALE });
  useEffect(() => {
    if (currentSentence === '') return;
    const subscription = checkSentence(currentSentence).subscribe(response => setCheckResponse(response));
    return () => subscription.unsubscribe();
  }, [currentSentence]);
  return (
    <ChatLayout>
      {checkResponse.state === ResponseState.SUCCESS && checkResponse.result && checkResponse.result.length > 0 && <>
        <p className="text">Non-English words: {checkResponse.result.join(', ')}</p>
      </>}
      {checkResponse.state === ResponseState.SUCCESS && checkResponse.result && checkResponse.result.length === 0 && <>
        <p className="text">Congrats! This sentence is composed out of valid words only. However, that doesn&apos;t mean it is grammatically correct.</p>
      </>}
      {checkResponse.state === ResponseState.ERROR && <>
        <p className="text">Oh snap! An error occurred. Please try again.</p>
      </>}
      {checkResponse.state === ResponseState.PENDING && <>
        <p className="pending"></p>
      </>}
      {checkResponse.state === ResponseState.STALE && <>
        <div>&nbsp;</div>
      </>}
      <StyledTextAreaWithButton>
        <TextareaWithButton
          placeholderText="Please type something"
          textAreaContent={currentSentence}
          buttonText="CHECK"
          onButtonClick={(value) => setCurrentSentence(value)}
        />
      </StyledTextAreaWithButton>
    </ChatLayout>
  );
};
