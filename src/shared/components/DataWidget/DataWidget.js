import React from 'react';
import { Typography, CircularProgress } from '@material-ui/core';
import { StyledDataWidget, LoadingWrapper } from './DataWidget.style';

const DataWidget = ({ loading, hasData, noDataMessage, children, className }) => {
  const showNoDataMessage = !hasData && !loading;
  const showChildren = hasData && !loading;

  return (
    <StyledDataWidget className={className}>
      {showChildren && children}

      {showNoDataMessage && (
        <Typography variant="h6" color="textSecondary">
          {noDataMessage}
        </Typography>
      )}

      <LoadingWrapper isLoading={loading}>
        <CircularProgress />
      </LoadingWrapper>
    </StyledDataWidget>
  );
};

export default DataWidget;
