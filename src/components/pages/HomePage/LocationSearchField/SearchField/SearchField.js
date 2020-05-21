import React from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import * as Icons from '@material-ui/icons';

const startAdornment = (
  <InputAdornment position="start">
    <Icons.Search />
  </InputAdornment>
);

const SearchField = ({ InputProps, ...restProps }) => (
  <TextField
    placeholder="Enter a Location"
    variant="outlined"
    InputProps={{ ...InputProps, startAdornment }}
    {...restProps}
  />
);

export default SearchField;
