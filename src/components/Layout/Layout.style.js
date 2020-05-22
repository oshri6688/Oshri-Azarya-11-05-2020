import styled from 'styled-components';

export const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

export const Content = styled.div`
  padding: 20px 30px;
  flex: 1;
  width: 100%;

  ${({ theme }) => theme.breakpoints.down('xs')} {
    padding: 10px;
  }
`;
