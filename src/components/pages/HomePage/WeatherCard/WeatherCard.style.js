import styled from 'styled-components';
import { IconButton, Card, CardContent } from '@material-ui/core';
import excludeComponentProps from 'shared/hocs/excludeComponentProps/excludeComponentProps';

export const StyledWeatherCard = styled(Card)`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  margin-top: 20px;
  min-height: 400px;
  max-height: 600px;
  flex: 1;

  ${({ theme }) => theme.breakpoints.down('xs')} {
    max-height: unset;
  }
`;

export const WeatherCardContent = styled(CardContent)`
  display: grid;
  grid-auto-columns: 100%;
  grid-template-rows: minmax(0, 1fr) auto;
  grid-row-gap: 20px;
  height: 100%;
  width: 100%;
`;

const CustomIconButton = excludeComponentProps(IconButton, ['isFavorite']);

export const FavoriteButton = styled(CustomIconButton)`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 20px;
  color: ${({ theme, isFavorite }) => isFavorite && theme.palette.error[theme.palette.type]};
`;
