import styled from 'styled-components';

export const StyledDataWidget = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export const LoadingWrapper = styled.div`
  position: absolute;
  display: ${({ isLoading }) => (isLoading ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;
