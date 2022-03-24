import axios from 'axios';
import React, { FC, SetStateAction, useEffect, useState } from 'react';

import { Item, OptionsType, pricePerItem } from '../../constants';
import { useOrderDetails } from '../../contexts/OrderDetails';
import { formatCurrency } from '../../utilities';
import AlertBanner from '../AlertBanner/AlertBanner';
import ServiceOption from './ServiceOption';
import TrainOption from './TrainOption';

type IOwnProps = {
  optionType: OptionsType;
};

const Options: FC<IOwnProps> = ({ optionType }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const [orderDetails, updateItemCount] = useOrderDetails();

  // optionType is 'trains' or 'services'
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response: { data: SetStateAction<never[]> }) => setItems(response.data))
      .catch(() => setError(true));
  }, [optionType]);

  if (error) {
    // @ts-ignore
    return <AlertBanner />;
  }

  const ItemComponent = optionType === 'trains' ? TrainOption : ServiceOption;
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  const optionItems = items.map((item: Item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
      updateItemCount={(itemName: string, newItemCount: number) =>
        updateItemCount(itemName, newItemCount, optionType)
      }
    />
  ));

  return (
    <>
      <h2>{title}</h2>
      <p>{`${formatCurrency(pricePerItem[optionType])} each`}</p>
      <p>{`${title} total: ${orderDetails.totals[optionType]}`}</p>
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>{optionItems}</div>
    </>
  );
};

export default Options;
