# Mock Server

## Installing
Run `yarn` inside this directory

## Starting the server
Run `npm start`

Server: http://localhost:3030

## Using the server
Server routes:
  - `GET /trains` and `GET /services` return sundae options (array of objects with keys `name` and `imagePath`)
  - `POST /order` returns a random order number (does not process order)
  - images via static `/images` directory.

## Testing
To test, run `npm test`.
