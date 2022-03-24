import userEvent from '@testing-library/user-event';
import React from 'react';

import Options from '../../components/Options/Options';
import { OptionsType } from '../../constants';
import { render, screen } from '../../test-utils/testing-library-utils';
import OrderEntry from './OrderEntry';

test('update train subtotal when trains change', async () => {
  render(<Options optionType={OptionsType.TRAINS} />, {});

  // make sure total starts out $0.00
  const trainsSubtotal = screen.getByText('Trains total: $', { exact: false });
  expect(trainsSubtotal).toHaveTextContent('0.00');

  // update goldie trains to 1 and check the subtotal
  const goldieInput = await screen.findByLabelText('Goldie');
  userEvent.clear(goldieInput);
  userEvent.type(goldieInput, '1');
  expect(trainsSubtotal).toHaveTextContent('420.00');

  // update shinkansen trains to 2 and check subtotal
  const shinkansenInput = await screen.findByLabelText('Shinkansen');
  userEvent.clear(shinkansenInput);
  userEvent.type(shinkansenInput, '2');
  expect(trainsSubtotal).toHaveTextContent('1,260.00');
});

test('update services subtotal when services change', async () => {
  // render parent component
  render(<Options optionType={OptionsType.SERVICES} />, {});

  // make sure total starts out at $0.00
  const servicesTotal = screen.getByText('Services total: $', { exact: false });
  expect(servicesTotal).toHaveTextContent('0.00');

  // add beer and check subtotal
  const beerCheckbox = await screen.findByRole('checkbox', {
    name: 'Beer',
  });
  userEvent.click(beerCheckbox);
  expect(servicesTotal).toHaveTextContent('42.69');

  // add hot fudge and check subtotal
  const hotFudgeCheckbox = screen.getByRole('checkbox', { name: 'Ribs' });
  userEvent.click(hotFudgeCheckbox);
  expect(servicesTotal).toHaveTextContent('85.38');

  // remove hot fudge and check subtotal
  userEvent.click(hotFudgeCheckbox);
  expect(servicesTotal).toHaveTextContent('42.69');
});

describe('grand total', () => {
  test('grand total updates properly if train is added first', async () => {
    // Test that the total starts out at $0.00
    render(<OrderEntry setOrderPhase={jest.fn()} />, {});
    const grandTotal = screen.getByRole('heading', { name: /Grand total: \$/ });
    expect(grandTotal).toHaveTextContent('0.00');

    // update goldie trains to 2 and check grand total
    const goldieInput = await screen.findByLabelText('Goldie');

    userEvent.clear(goldieInput);
    userEvent.type(goldieInput, '2');
    expect(grandTotal).toHaveTextContent('840');

    // add beer and check grand total
    const beerCheckbox = await screen.findByRole('checkbox', {
      name: 'Beer',
    });
    userEvent.click(beerCheckbox);
    expect(grandTotal).toHaveTextContent('882.69');
  });

  test('grand total updates properly if service is added first', async () => {
    render(<OrderEntry setOrderPhase={jest.fn()} />, {});

    // add beer and check grand total
    const beerCheckbox = await screen.findByRole('checkbox', {
      name: 'Beer',
    });
    userEvent.click(beerCheckbox);
    const grandTotal = screen.getByRole('heading', { name: /Grand total: \$/ });
    expect(grandTotal).toHaveTextContent('42.69');

    // update goldie trains to 2 and check grand total
    const goldieInput = await screen.findByLabelText('Goldie');

    userEvent.clear(goldieInput);
    userEvent.type(goldieInput, '2');
    expect(grandTotal).toHaveTextContent('882.69');
  });

  test('grand total updates properly if item is removed', async () => {
    render(<OrderEntry setOrderPhase={jest.fn()} />, {});

    // add beer
    const beerCheckbox = await screen.findByRole('checkbox', {
      name: 'Beer',
    });
    userEvent.click(beerCheckbox);
    // grand total $42.69

    // update goldie trains to 2; grand total should be $85.38
    const goldieInput = await screen.findByLabelText('Goldie');

    userEvent.clear(goldieInput);
    userEvent.type(goldieInput, '2');

    // remove 1 train of goldie and check grand total
    userEvent.clear(goldieInput);
    userEvent.type(goldieInput, '1');

    // check grand total
    const grandTotal = screen.getByRole('heading', { name: /Grand total: \$/ });
    expect(grandTotal).toHaveTextContent('462.69');

    // remove beer and check grand total
    userEvent.click(beerCheckbox);
    expect(grandTotal).toHaveTextContent('420.00');
  });
});
