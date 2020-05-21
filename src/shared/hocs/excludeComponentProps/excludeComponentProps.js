import React, { forwardRef } from 'react';
import { omit } from 'lodash';

const excludeComponentProps = (Component, excludedProps) => {
  return forwardRef((props, ref) => {
    const filteredProps = omit(props, excludedProps);

    return <Component ref={ref} {...filteredProps} />;
  });
};

export default excludeComponentProps;
