import { Checkbox, FormControlLabel } from '@material-ui/core';
import React, { FC } from 'react';

type IOwnProps = {
  name: string;
  imagePath: string;
  updateItemCount: any;
};

const ServiceOption: FC<IOwnProps> = ({ name, imagePath, updateItemCount }) => (
  <div style={{ textAlign: 'center' }}>
    <img
      width="auto"
      height={100}
      src={`http://localhost:3030/${imagePath}`}
      alt={`${name} service`}
    />
    <div>
      <FormControlLabel
        control={
          <Checkbox
            onChange={(e: any) => {
              updateItemCount(name, e.target.checked ? 1 : 0);
            }}
          />
        }
        label={name}
      />
    </div>
  </div>
);

export default ServiceOption;
