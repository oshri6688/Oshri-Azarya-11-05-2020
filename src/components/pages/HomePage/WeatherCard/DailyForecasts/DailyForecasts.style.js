import styled from 'styled-components';

export const StyledDailyForecasts = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
  grid-template-rows: 150px;
  grid-gap: 20px;
  width: 100%;

  ${({ theme }) => theme.breakpoints.down('xs')} {
    grid-template-columns: 1fr;
    grid-template-rows: unset;
    grid-auto-rows: 100px;
  }
`;
