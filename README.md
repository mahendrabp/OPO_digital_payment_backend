# OPO Digital Payment

<p align="center">
  <a href="https://nodejs.org/">
    <img title="Restful API" src="https://cdn-images-1.medium.com/max/871/1*d2zLEjERsrs1Rzk_95QU9A.png">
  </a>
</p>

---

## Table of contents

- [OPO Digital Payment API]()
  - [Table of contents](#table-of-contents)
  - [TODO Tasks](#todo-tasks)
  - [Stacks](#stacks)
  - [Build Setup](#build-setup)
  - [API Docs](#api-docs)
    - [Users]()
    - [Transactions]()

## TODO Tasks

## Stacks

- NodeJS
- MySQL
- ExpressJS
- JWT
- Express Validator
- Redis

## Build Setup

1. Clone repository
   `$ git clone https://github.com/mahendrabp/OPO_digital_payment_backend.git`

2. Install depedencies

```bash
# with npm
$ npm install

# or with yarn
$ yarn install
```

3. Setup environment variable in `.env` files (if not exists, create own).

```env


# DATABASE
DB_HOSTNAME = 127.0.0.1
DB_USERNAME = your_username
DB_PASSWORD = your_password_database
DB_NAME = your_database_name

# SECRET KEY
SECRET_JWT = xxxx
```

4. Start API server

## API Documentation

### User OPO

| Method | Endpoint                  | Description | Request Param | Request Body                                                       |
| ------ | ------------------------- | ----------- | ------------- | ------------------------------------------------------------------ |
| GET    | /api/v1/user/get/:id      |             | `id` : UUID   | -                                                                  |
| POST   | /api/v1/user/login/step1  |             | -             | `phone`: STRING,`email`: STRING,`name`: STRING,`securityCode`: INT |
| POST   | /api/v1/user/login/step2  |             | -             | `phone`: STRING,`email`: STRING,`name`: STRING,`securityCode`: INT |
| POST   | /api/v1/user/signup/step1 |             | -             | `phone`: STRING,`email`: STRING,`name`: STRING,`securityCode`: INT |
| POST   | /api/v1/user/signup/step2 |             | -             | `phone`: STRING,`email`: STRING,`name`: STRING,`securityCode`: INT |
| PATCH  | /api/v1/user/edit/:id     |             | `id` : UUID   | `phone`: STRING,`email`: STRING,`name`: STRING,`securityCode`: INT |

### Balance

| Method | Endpoint                     | Description | Request Param | Request Body                                                       |
| ------ | ---------------------------- | ----------- | ------------- | ------------------------------------------------------------------ |
| POST   | /api/v1/balance/transfer/:id |             | `id` : UUID   | `phone`: STRING,`email`: STRING,`name`: STRING,`securityCode`: INT |

### PPOB

| Method | Endpoint                     | Description | Request Param | Request Body                    |
| ------ | ---------------------------- | ----------- | ------------- | ------------------------------- |
| POST   | /api/v1/balance/ppob/in/:id  |             | `id` : UUID   | `nominal`:INT, `merchantId`:INT |
| POST   | /api/v1/balance/ppob/out/:id |             | `id` : UUID   | `nominal`:INT, `merchantId`:INT |

### Deal

| Method | Endpoint                  | Description | Request Param   | Request Body                                                                                             |
| ------ | ------------------------- | ----------- | --------------- | -------------------------------------------------------------------------------------------------------- |
| GET    | /api/v1/deal/:id          |             | `id` : UUID     | -                                                                                                        |
| GET    | /api/v1/deal/category/:id |             | `id` : ID       | -                                                                                                        |
| GET    | /api/v1/deal/type/:type   |             | `type` : STRING | -                                                                                                        |
| POST   | /api/v1/deal              |             | -               | `type`: STRING,`category_id`: INT,`merchant_id`: STRING,`title`: INT,`date_start`: DATE,`date_end`: DATE |
| PATCH  | /api/v1/deal/             |             | -               | `type`: STRING,`category_id`: INT,`merchant_id`: STRING,`title`: INT,`date_start`: DATE,`date_end`: DATE |
| DELETE | /api/v1/deal/:id          |             | `id` :UUID      |                                                                                                          |

Copyright © 2019 by Cloverview Team
