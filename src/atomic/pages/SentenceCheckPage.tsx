import React from 'react';
import styled from 'styled-components';
import { SentenceChecker } from '../organisms/SentenceChecker';

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const MobileCaseShadow = styled.div`
  background-color: black;
  border: 1rem solid black;
  transform: rotate(-2deg);
`;

const MobileCaseWrapper = styled.div`
  height: 55vh;
  background-color: white;
  transform: skew(0deg, 2deg);
  padding: 1rem;
`;

const MobileScreenWrapper = styled.div`
  width: 20rem;
  background-color: white;
  transform: skew(-2deg, -2deg);
  padding: 2rem;
  border: 0.25rem solid black;
  height: 100%;
  box-sizing: border-box;
  background-color: #a40000;
`;

export const SentenceCheckPage = () => {
  return (
    <PageWrapper>
      <MobileCaseShadow>
        <MobileCaseWrapper>
          <MobileScreenWrapper>
            <SentenceChecker />
          </MobileScreenWrapper>
        </MobileCaseWrapper>
      </MobileCaseShadow>
    </PageWrapper>
  );
};
