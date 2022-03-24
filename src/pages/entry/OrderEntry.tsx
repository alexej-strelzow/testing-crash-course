import { Button } from '@material-ui/core';
import React, { FC } from 'react';

import Options from '../../components/Options/Options';
import { OptionsType } from '../../constants';
import { useOrderDetails } from '../../contexts/OrderDetails';

type IOwnProps = {
  setOrderPhase: (phase: string) => void;
};

const OrderEntry: FC<IOwnProps> = ({ setOrderPhase }) => {
  const [orderDetails] = useOrderDetails();

  // disable order button if there aren't any trains in order
  const orderDisabled = orderDetails.totals.trains === '$0.00';

  return (
    <div>
      <h1>Rent Your Party-Train!</h1>
      <Options optionType={OptionsType.TRAINS} />
      <Options optionType={OptionsType.SERVICES} />
      <h2>{`Grand total: ${orderDetails.totals.grandTotal}`}</h2>
      <Button variant="contained" disabled={orderDisabled} onClick={() => setOrderPhase('review')}>
        Place Order!
      </Button>
    </div>
  );
};

export default OrderEntry;
