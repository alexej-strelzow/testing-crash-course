import React, { FC } from 'react';

import { useOrderDetails } from '../../contexts/OrderDetails';
import SummaryForm from './SummaryForm';

type IOwnProps = {
  setOrderPhase: (phase: string) => void;
};

const OrderSummary: FC<IOwnProps> = ({ setOrderPhase }) => {
  const [orderDetails] = useOrderDetails();

  const trainArray: any[] = Array.from(orderDetails.trains.entries());
  const trainList = trainArray.map(([key, value]) => <li key={key}>{`${value} ${key}`}</li>);

  // only display services if the services total is nonzero
  const hasServices = orderDetails.totals.services !== '$0.00';
  let servicesDisplay = null;

  if (hasServices) {
    const servicesArray: string[] = Array.from(orderDetails.services.keys());
    const serviceList = servicesArray.map((key: string) => <li key={key}>{key}</li>);
    servicesDisplay = (
      <>
        <h2>{`Services: ${orderDetails.totals.services}`}</h2>
        <ul>{serviceList}</ul>
      </>
    );
  }

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>{`Trains: ${orderDetails.totals.trains}`}</h2>
      <ul>{trainList}</ul>
      {servicesDisplay}
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  );
};

export default OrderSummary;
