import { Button } from '@material-ui/core';
import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';

import AlertBanner from '../../components/AlertBanner/AlertBanner';
import { useOrderDetails } from '../../contexts/OrderDetails';

export default function OrderConfirmation({ setOrderPhase }: { setOrderPhase: any }) {
  const [, , resetOrder] = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      // in a real app we would get order details from context
      // and send with POST
      .post('http://localhost:3030/order')
      .then((response: AxiosResponse<any>) => setOrderNumber(response.data.orderNumber))
      .catch(() => setError(true));
  }, []);

  if (error) {
    return <AlertBanner />;
  }

  function handleClick() {
    // clear the order details
    resetOrder();

    // send back to order page
    setOrderPhase('inProgress');
  }

  if (orderNumber) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Thank You!</h1>
        <p>{`Your order number is ${orderNumber}`}</p>
        <p style={{ fontSize: '25%' }}>as per our terms and conditions, do the right thing</p>
        <Button onClick={handleClick}>Create new order</Button>
      </div>
    );
  }
  return <div>Loading</div>;
}
