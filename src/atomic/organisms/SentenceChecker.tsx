import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { checkSentence } from '../../service/checkSentence';
import { ResponseState, ResponseWrapper } from '../../types';
import { TextareaWithButton } from '../molecules/TextareaWithButton';

const StyledTextAreaWithButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 0.5rem;
  textarea {
    min-width: 450px;
    min-height: 150px;
    border: 1px solid black;
    resize: none;
    padding: 0.5rem;
  }
  button {
    padding: 0.5rem;
    background-color: #CECECE;
    border: 1px solid black;
    border-radius: 0.5rem;
  }
  p {
    margin: 0.5rem 0;
  }
`;

export const SentenceChecker = () => {
  const [currentSentence, setCurrentSentence] = useState('');
  const [checkResponse, setCheckResponse] = useState<ResponseWrapper<string[]>>({ state: ResponseState.STALE });
  useEffect(() => {
    const subscription = checkSentence(currentSentence).subscribe(response => setCheckResponse(response));
    return () => subscription.unsubscribe();
  }, [currentSentence]);
  return <StyledTextAreaWithButton>
    <TextareaWithButton
      textAreaContent={currentSentence}
      buttonText="CHECK"
      onButtonClick={(value) => setCurrentSentence(value)}
    />
    {checkResponse.state === ResponseState.SUCCESS && checkResponse.result && checkResponse.result.length > 0 && <>
      <p>Non-English words: {checkResponse.result.join(', ')}</p>
    </>}
    {checkResponse.state === ResponseState.SUCCESS && checkResponse.result && checkResponse.result.length === 0 && <>
      <p>Congrats! This sentence is composed out of valid words only. However, that doesn't mean it is grammatically correct.</p>
    </>}
  </StyledTextAreaWithButton>
}
