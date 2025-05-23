# Cloudflare Workers OpenAPI 3.1

This is a Cloudflare Worker with OpenAPI 3.1 using [chanfana](https://github.com/cloudflare/chanfana) and [Hono](https://github.com/honojs/hono).

This is an example project made to be used as a quick start into building OpenAPI compliant Workers that generates the
`openapi.json` schema automatically from code and validates the incoming request to the defined parameters or request body.

curl -X POST https://koi.sgy.co.in/api/log \
  -H "Authorization: Bearer key" \
  -H "X-Logger-Label: value" \
  -H "Content-Type: application/json" \
  -d '{"log": "Testing the koi logger 🚀"}'

## Get started

1. Sign up for [Cloudflare Workers](https://workers.dev). The free tier is more than enough for most use cases.
2. Clone this project and install dependencies with `npm install`

Commands to start the project:

`sudo npm run start`: start without connection to remote db.

`sudo npm run start-prod`: start with connection to remote db.

`sudo npm run deploy`: deploy your code to prod.

`sudo npm run migrate`: fully reset your local db instance (careful if you have data in db. Take backup).

`sudo npm run migrate-prod`: fully reset your remote prod db instance (careful if you have data in db. Take backup).

3. Run `wrangler login` to login to your Cloudflare account in wrangler
4. Run `wrangler deploy` to publish the API to Cloudflare Workers

## Project structure

1. Your main router is defined in `src/index.ts`.
2. Each endpoint has its own file in `src/endpoints/`.
3. For more information read the [chanfana documentation](https://chanfana.pages.dev/) and [Hono documentation](https://hono.dev/docs).

## Development

1. Run `wrangler dev` to start a local instance of the API.
2. Open `http://localhost:8787/` in your browser to see the Swagger interface where you can try the endpoints.
3. Changes made in the `src/` folder will automatically trigger the server to reload, you only need to refresh the Swagger interface.
