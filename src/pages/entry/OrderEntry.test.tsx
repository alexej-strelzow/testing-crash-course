import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import React from 'react';

import { server } from '../../mocks/server';
import { render, screen, waitFor } from '../../test-utils/testing-library-utils';
import OrderEntry from './OrderEntry';

test('handles error for trains and services routes', async () => {
  server.resetHandlers(
    rest.get('http://localhost:3030/trains', (req, res, ctx) => res(ctx.status(500))),
    rest.get('http://localhost:3030/services', (req, res, ctx) => res(ctx.status(500)))
  );

  render(<OrderEntry setOrderPhase={jest.fn()} />, {});

  await waitFor(async () => {
    const alerts = await screen.findAllByRole('alert');
    expect(alerts).toHaveLength(2);
  });
});

test('disable order button if there are no trains ordered', async () => {
  render(<OrderEntry setOrderPhase={jest.fn()} />, {});

  // order button should be disabled at first, even before options load
  const orderButton = screen.getByRole('button', { name: /place order/i });
  expect(orderButton).toBeDisabled();

  // expect button to be enabled after adding train
  const goldieInput = await screen.findByLabelText('Goldie');
  userEvent.clear(goldieInput);
  userEvent.type(goldieInput, '1');
  expect(orderButton).toBeEnabled();

  // expect button to be disabled again after removing train
  userEvent.clear(goldieInput);
  userEvent.type(goldieInput, '0');
  expect(orderButton).toBeDisabled();
});
