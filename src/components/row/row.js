import React from 'react';
import './row.css';

import ErrorBoundry from '../error-boundry';

const Row = ({left, right}) => {
  return (
    <div className="row mb2">
      <ErrorBoundry>
        <div className="col-md-6">
          {left}
        </div>
      </ErrorBoundry>

      <ErrorBoundry>
        <div className="col-md-6">
          {right}
        </div>
      </ErrorBoundry>
    </div>
  );
};

export default Row;
