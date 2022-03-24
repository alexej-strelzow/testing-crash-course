import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import App from './App';

test('Order phases for happy path', async () => {
  // render app
  // Don't need to wrap in provider; already wrapped!
  render(<App />);

  // add ice cream trains and services
  const goldieInput = await screen.findByLabelText('Goldie');
  userEvent.clear(goldieInput);
  userEvent.type(goldieInput, '1');

  const shinkansenInput = screen.getByLabelText('Shinkansen');
  userEvent.clear(shinkansenInput);
  userEvent.type(shinkansenInput, '2');

  const beerCheckbox = await screen.findByRole('checkbox', {
    name: 'Beer',
  });
  userEvent.click(beerCheckbox);

  // find and click order summary button
  const orderSummaryButton = screen.getByRole('button', {
    name: /place order/i,
  });
  userEvent.click(orderSummaryButton);

  // check summary subtotals
  const summaryHeading = screen.getByRole('heading', { name: 'Order Summary' });
  expect(summaryHeading).toBeInTheDocument();

  const trainsHeading = screen.getByRole('heading', { name: 'Trains: $1,260.00' });
  expect(trainsHeading).toBeInTheDocument();

  const servicesHeading = screen.getByRole('heading', {
    name: 'Services: $42.69',
  });
  expect(servicesHeading).toBeInTheDocument();

  // check summary option items
  expect(screen.getByText('1 Goldie')).toBeInTheDocument();
  expect(screen.getByText('2 Shinkansen')).toBeInTheDocument();
  expect(screen.getByText('Beer')).toBeInTheDocument();

  // // alternatively...
  // // const optionItems = screen.getAllByRole('listitem');
  // // const optionItemsText = optionItems.map((item) => item.textContent);
  // // expect(optionItemsText).toEqual(['1 Goldie', '2 Shinkansen', 'Beer']);

  // accept terms and click button
  const tcCheckbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  userEvent.click(tcCheckbox);

  const confirmOrderButton = screen.getByRole('button', {
    name: /confirm order/i,
  });
  userEvent.click(confirmOrderButton);

  // Expect "loading" to show
  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();

  // check confirmation page text
  // this one is async because there is a POST request to server in between summary
  //    and confirmation pages
  const thankYouHeader = await screen.findByRole('heading', {
    name: /thank you/i,
  });
  expect(thankYouHeader).toBeInTheDocument();

  // expect that loading has disappeared
  const notLoading = screen.queryByText('loading');
  expect(notLoading).not.toBeInTheDocument();

  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();

  // find and click "new order" button on confirmation page
  const newOrderButton = screen.getByRole('button', { name: /new order/i });
  userEvent.click(newOrderButton);

  // check that trains and services have been reset
  const trainsTotal = await screen.findByText('Trains total: $0.00');
  expect(trainsTotal).toBeInTheDocument();
  const servicesTotal = screen.getByText('Services total: $0.00');
  expect(servicesTotal).toBeInTheDocument();

  // wait for items to appear so that Testing Library doesn't get angry about stuff
  // happening after test is over
  await screen.findByLabelText('Goldie');
  await screen.findByRole('checkbox', { name: 'Beer' });
});

test('Services header is not on summary page if no services ordered', async () => {
  // render app
  render(<App />);

  // add ice cream trains but no services
  const goldieInput = await screen.findByLabelText('Goldie');

  userEvent.clear(goldieInput);
  userEvent.type(goldieInput, '1');

  const shinkansenInput = screen.getByLabelText('Shinkansen');
  userEvent.clear(shinkansenInput);
  userEvent.type(shinkansenInput, '2');

  // find and click order summary button
  const orderSummaryButton = screen.getByRole('button', {
    name: /place order/i,
  });
  userEvent.click(orderSummaryButton);

  const trainsHeading = screen.getByRole('heading', { name: 'Trains: $1,260.00' });
  expect(trainsHeading).toBeInTheDocument();

  const servicesHeading = screen.queryByRole('heading', { name: /services/i });
  expect(servicesHeading).not.toBeInTheDocument();
});

test('Services header is not on summary page if services ordered, then removed', async () => {
  // render app
  render(<App />);

  // add ice cream trains
  const goldieInput = await screen.findByLabelText('Goldie');

  userEvent.clear(goldieInput);
  userEvent.type(goldieInput, '1');

  // add a service and confirm
  const beerTopping = await screen.findByRole('checkbox', {
    name: 'Beer',
  });
  userEvent.click(beerTopping);
  expect(beerTopping).toBeChecked();
  const servicesTotal = screen.getByText('Services total: $', { exact: false });
  expect(servicesTotal).toHaveTextContent('42.69');

  // remove the service
  userEvent.click(beerTopping);
  expect(beerTopping).not.toBeChecked();
  expect(servicesTotal).toHaveTextContent('0.00');

  // find and click order summary button
  const orderSummaryButton = screen.getByRole('button', {
    name: /place order/i,
  });
  userEvent.click(orderSummaryButton);

  const trainsHeading = screen.getByRole('heading', { name: 'Trains: $420.00' });
  expect(trainsHeading).toBeInTheDocument();

  const servicesHeading = screen.queryByRole('heading', { name: /services/i });
  expect(servicesHeading).not.toBeInTheDocument();
});
