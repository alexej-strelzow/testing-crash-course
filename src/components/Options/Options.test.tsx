import userEvent from '@testing-library/user-event';
import React from 'react';

import { OptionsType } from '../../constants';
import { render, screen } from '../../test-utils/testing-library-utils';
import Options from './Options';

test('displays image for each train option from server', async () => {
  render(<Options optionType={OptionsType.TRAINS} />, {});

  // find images
  const trainImages = await screen.findAllByRole('img', { name: /train$/i });
  expect(trainImages).toHaveLength(2);

  // confirm alt text of images
  // @ts-ignore
  const altText = trainImages.map((element: HTMLImageElement) => element.alt);
  expect(altText).toEqual(['Shinkansen train', 'Goldie train']);
});

test('Displays image for each services option from server', async () => {
  // Mock Service Worker will return three services from server
  render(<Options optionType={OptionsType.SERVICES} />, {});

  // find images, expect 3 based on what msw returns
  const images = (await screen.findAllByRole('img', { name: /service$/i })) as HTMLImageElement[];
  expect(images).toHaveLength(3);

  // check the actual alt text for the images
  const imageTitles = images.map((img: HTMLImageElement) => img.alt);
  expect(imageTitles).toEqual(['Beer service', 'Sushi service', 'Ribs service']);
});

test('do not update total if trains input is invalid', async () => {
  render(<Options optionType={OptionsType.TRAINS} />, {});

  // expect button to be enabled after adding train
  const goldieInput = await screen.findByLabelText('Goldie');
  userEvent.clear(goldieInput);
  userEvent.type(goldieInput, '-1');

  // make sure trains subtotal hasn't updated
  const trainsSubtotal = screen.getByText('Trains total: $0.00');
  expect(trainsSubtotal).toBeInTheDocument();
});
