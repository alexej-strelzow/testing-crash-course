import { TextField } from '@material-ui/core';
import React, { FC, useState } from 'react';

type IOwnProps = {
  name: string;
  imagePath: string;
  updateItemCount: any;
};

const TrainOptions: FC<IOwnProps> = ({ name, imagePath, updateItemCount }) => {
  const [isValid, setIsValid] = useState<boolean>(true);
  const handleChange = (event: any) => {
    const currentValue = event.target.value || 0;

    // make sure we're using a number and not a string to validate
    const currentValueFloat = parseFloat(currentValue);
    const valueIsValid =
      currentValueFloat >= 0 &&
      currentValueFloat <= 10 &&
      Math.floor(currentValueFloat) === currentValueFloat;

    // validate
    setIsValid(valueIsValid);

    // only update context if the value is valid
    if (valueIsValid) {
      updateItemCount(name, currentValue);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <img
        width="auto"
        height={100}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} train`}
      />
      <div style={{ marginTop: '10px' }}>
        <TextField
          id={name}
          label={name}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChange}
          className={!isValid ? 'invalid' : ''}
          error={!isValid}
          helperText={!isValid ? 'must be < 10' : ''}
        />
      </div>
    </div>
  );
};

export default TrainOptions;
