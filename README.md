<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Ultimate API

## Description

This is an example of replies that consumes Ultimate.ai Api. It was built using [Nest](https://github.com/nestjs/nest).

## Get Started

- For a first attempt, try to run using docker. All services are ready to be runned using `docker-compose`.

## Installation

- Make a copy of `.env-sample` to `.env`
- Insert Ultimate Auth Params into these ENVs

```bash
ULTIMATE_BOT_ID=
ULTIMATE_APIKEY=
ULTIMATE_HOST=
```

## Database Seed

Atention: This step is important to load an initial Answers List

```bash
$ docker-compose up --build seed
```

## Run locally with docker

```bash
# Run all resources
$ docker-compose up
```

## Run locally without docker

```bash
$ yarn install
```

### Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

### Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Documentations

- After running, access `http://localhost:3000/api`. This is a Swagger Documentation to test all endpoints available.

## Doing a first request to get a Reply

- POST to `messages`:
_Request_
```
curl -X 'POST' \
  'http://localhost:3000/messages' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "botId": "12345",
  "message": "Hello!"
}'
```

_Response_
```
{
  "_id": "60adc65875b9c700e36d139c",
  "botId": "12345",
  "message": "Hello!",
  "reply": "Hey, what's up! How can I help you?",
  "intent": "Greeting",
  "__v": 0
}
```
## License

Nest is [MIT licensed](LICENSE).
