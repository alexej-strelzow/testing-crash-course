import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { OptionsType, pricePerItem } from '../constants';
import { formatCurrency } from '../utilities';

// @ts-ignore
const OrderDetails = createContext<any>();

// create custom hook to check whether we're inside a provider
export function useOrderDetails() {
  const context = useContext(OrderDetails);

  if (!context) {
    throw new Error('useOrderDetails must be used within an OrderDetailsProvider');
  }

  return context;
}

function calculateSubtotal(optionType: OptionsType, optionCounts: any) {
  // Map<string, number>
  let optionCount = 0;
  const values = optionCounts[optionType].values();
  // eslint-disable-next-line no-restricted-syntax
  for (const count of values) {
    optionCount += count;
  }

  return optionCount * pricePerItem[optionType];
}

export function OrderDetailsProvider(props: any) {
  const [optionCounts, setOptionCounts] = useState({
    trains: new Map<string, number>(),
    services: new Map<string, number>(),
  });
  const zeroCurrency = formatCurrency(0);
  const [totals, setTotals] = useState({
    trains: zeroCurrency,
    services: zeroCurrency,
    grandTotal: zeroCurrency,
  });

  useEffect(() => {
    const trainsSubtotal = calculateSubtotal(OptionsType.TRAINS, optionCounts);
    const servicesSubtotal = calculateSubtotal(OptionsType.SERVICES, optionCounts);
    const grandTotal = trainsSubtotal + servicesSubtotal;
    setTotals({
      trains: formatCurrency(trainsSubtotal),
      services: formatCurrency(servicesSubtotal),
      grandTotal: formatCurrency(grandTotal),
    });
  }, [optionCounts]);

  const value = useMemo(() => {
    function updateItemCount(itemName: string, newItemCount: string, optionType: OptionsType) {
      const newOptionCounts = { ...optionCounts };

      // update option count for this item with the new value
      const optionCountsMap = optionCounts[optionType];
      optionCountsMap.set(itemName, parseInt(newItemCount, 10));

      setOptionCounts(newOptionCounts);
    }

    // alternate updateItemCount that DOES NOT mutate state.
    // function updateItemCount(itemName, newItemCount, optionType) {
    //   // get option Map and make a copy
    //   const { [optionType]: optionMap } = optionCounts;
    //   const newOptionMap = new Map(optionMap);

    //   // update the copied Map
    //   newOptionMap.set(itemName, parseInt(newItemCount));

    //   // create new object with the old optionCounts plus new map
    //   const newOptionCounts = { ...optionCounts };
    //   newOptionCounts[optionType] = newOptionMap;

    //   // update state
    //   setOptionCounts(newOptionCounts);
    // }

    function resetOrder() {
      setOptionCounts({
        trains: new Map<string, number>(),
        services: new Map<string, number>(),
      });
    }
    // getter: object containing option counts for trains and services, subtotals and totals
    // setter: updateOptionCount
    return [{ ...optionCounts, totals }, updateItemCount, resetOrder];
  }, [optionCounts, totals]);
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <OrderDetails.Provider value={value} {...props} />;
}
