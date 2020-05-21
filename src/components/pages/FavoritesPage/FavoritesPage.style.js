import styled from 'styled-components';

export const StyledFavoritesPage = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 230px);
  grid-auto-rows: 250px;
  grid-gap: 20px;
  width: 100%;
  height: 100%;

  ${({ theme }) => theme.breakpoints.down('xs')} {
    grid-template-columns: 1fr;
    grid-auto-rows: 200px;
  }
`;
