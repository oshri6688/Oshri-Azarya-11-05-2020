import React from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import DataWidget from 'shared/components/DataWidget/DataWidget';
import { getFavorites } from 'redux/selectors/SettingsSelectors/SettingsSelectors';
import { StyledFavoritesPage } from './FavoritesPage.style';
import FavoriteItem from './FavoriteItem/FavoriteItem';
import useFavorites from './useFavorites/useFavorites';

const FavoritesPage = () => {
  const favorites = useSelector(getFavorites);
  const { weatherLocations, isLoading } = useFavorites(favorites);

  return (
    <DataWidget loading={isLoading} hasData={!isEmpty(weatherLocations)} noDataMessage="No Favorite Added">
      <StyledFavoritesPage>
        {weatherLocations.map((weather) => (
          <FavoriteItem key={weather.location.id} weather={weather} />
        ))}
      </StyledFavoritesPage>
    </DataWidget>
  );
};

export default FavoritesPage;
