import Alert from '@material-ui/lab/Alert';
import React, { FC } from 'react';

type IOwnProps = {
  message?: string;
  variant?: 'standard' | 'filled' | 'outlined';
};

const AlertBanner: FC<IOwnProps> = ({ message, variant = 'standard' }) => {
  const alertMessage = message || 'An unexpected error occurred. Please try again later.';

  return (
    <Alert variant={variant} style={{ backgroundColor: 'red' }}>
      {alertMessage}
    </Alert>
  );
};

export default AlertBanner;
