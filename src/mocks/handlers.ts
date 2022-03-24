// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';

export const handlers = [
  rest.get('http://localhost:3030/trains', (req, res, ctx) =>
    res(
      ctx.json([
        { name: 'Shinkansen', imagePath: '/images/train1.jpeg' },
        { name: 'Goldie', imagePath: '/images/train2.jpeg' },
      ])
    )
  ),
  rest.get('http://localhost:3030/services', (req, res, ctx) =>
    res(
      ctx.json([
        { name: 'Beer', imagePath: '/images/drinks3.jpeg' },
        { name: 'Sushi', imagePath: '/images/food1.jpeg' },
        { name: 'Ribs', imagePath: '/images/food2.jpeg' },
      ])
    )
  ),
  rest.post('http://localhost:3030/order', (req, res, ctx) =>
    res(ctx.json({ orderNumber: 42081569 }))
  ),
];
