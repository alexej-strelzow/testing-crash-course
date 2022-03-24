import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import TrainOption from './TrainOption';

test.only('indicate if train count is non-int or out of range', async () => {
  render(<TrainOption name="Goldie" imagePath="" updateItemCount={jest.fn()} />);

  // expect input to be invalid with negative number
  const goldieInput = screen.getByLabelText('Goldie');
  userEvent.clear(goldieInput);
  userEvent.type(goldieInput, '-1');
  expect(goldieInput).toBeInvalid();

  // replace with decimal input
  userEvent.clear(goldieInput);
  userEvent.type(goldieInput, '2.5');
  expect(goldieInput).toBeInvalid();

  // replace with input that's too high
  userEvent.clear(goldieInput);
  userEvent.type(goldieInput, '11');
  expect(goldieInput).toBeInvalid();

  // replace with valid input
  // note: here we're testing our validation rules (namely that the input can display as valid)
  // and not react-bootstrap's response
  userEvent.clear(goldieInput);
  userEvent.type(goldieInput, '3');
  expect(goldieInput).not.toBeInvalid();
});
