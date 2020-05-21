import React from 'react';
import * as Icons from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import { IconButton, Tooltip } from '@material-ui/core';
import { StyledLocationSearchField } from './LocationSearchField.style';
import useLocationSearch from './useLocationSearch/useLocationSearch';
import SearchField from './SearchField/SearchField';

const LocationSearchField = ({ onSelect }) => {
  const { locations, isLoading, setInputValue, useMyLocation } = useLocationSearch(onSelect);

  return (
    <StyledLocationSearchField>
      <Autocomplete
        autoComplete
        forcePopupIcon={false}
        openOnFocus={false}
        options={locations}
        loading={isLoading}
        getOptionLabel={(option) => `${option.city}, ${option.administrativeArea}, ${option.country}`}
        getOptionSelected={(option, value) => option.id === value.id}
        renderInput={SearchField}
        onChange={(event, option) => onSelect(option)}
        onInputChange={(event, value) => setInputValue(value)}
      />
      <Tooltip title="Use my location">
        <IconButton onClick={useMyLocation}>
          <Icons.MyLocation />
        </IconButton>
      </Tooltip>
    </StyledLocationSearchField>
  );
};

export default LocationSearchField;
