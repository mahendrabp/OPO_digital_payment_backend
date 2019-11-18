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
- Sequelize ORM
- JWT
- Joi Validator
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

### User

| Method | Endpoint | Description | Request Param       | Request Body   | Request Query |
| ------ | -------- | ----------- | ------------------- | -------------- | ------------- |
| GET    | /api/v1/ | Get         | -                   | -              | -             |
| POST   | /api/v1/ | Create new  | -                   | `name`: STRING | -             |
| GET    | /api/v1/ | Get one     | `id`: STRING (UUID) | -              | -             |
| PUT    | /api/v1/ | Update      | `id`: STRING (UUID) | `name`: STRING | -             |
| DELETE | /api/v1/ | Delete      | `id`: STRING (UUID) | -              | -             |

Copyright © 2019 by Cloverview Team
