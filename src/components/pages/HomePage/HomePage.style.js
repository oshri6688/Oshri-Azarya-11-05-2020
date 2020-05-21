import styled from 'styled-components';

export const StyledHomePage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 80%;
  max-width: 1000px;
  margin: 0 auto;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    width: 90%;
  }

  ${({ theme }) => theme.breakpoints.down('xs')} {
    width: 100%;
  }
`;
