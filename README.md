<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Gateways Management System (GMS) Backend - API

The GMS API is a backend application for managing gateways and their associated peripheral devices. It provides a RESTful interface for storing and retrieving information about these devices.

## Getting Started

### Prerequisites

To run the GMS API, you'll need the following installed on your system:

- Node.js (version 16 or higher)
- MongoDB (version 5.0.0 or higher)

### Installation

1. Clone the repository from GitHub:

```
https://github.com/jorgelhd94/gateways-backend.git
```

2. Install the dependencies:

```
yarn install
```

3. Have Nest CLI installed

```
npm i -g @nestjs/cli
```

4. Up the development database

```
docker-compose up -d
```

5. Configure the environment variables:

- Clone the file `.env.template` and rename the copy to `
.env`

6. Edit the environment variables defined in `.env`

```
PORT=3000
JWT_SECRET=EsTEeSMisEcretOO32
APP_MODE=DEVELOP # 'DEVELOP' | 'PRODUCTION'
MONGODB_DEVELOP=mongodb://localhost:27017/gatewaysdb
MONGODB_PRODUCTION=mongodb+srv://mongo:mongo@cluster0.3qsyk6t.mongodb.net/gatewaysdb
```

IMPORTANT: The Mongo DB Production URI is a real db deploy in the Atlas Cloud Service. To use it, simply change the APP_MODE to **PRODUCTION**.

7. Start the server in development mode:

```
yarn start:dev
```

## API Documentation
The GMS API provides the following endpoints:

### Gateways
* `GET /gateways`: Returns a list of all gateways and their associated devices.
* `POST /gateways`: Adds a new gateway to the database.
* `GET /gateways/:id`: Returns information about a specific gateway and its associated devices.
* `PATCH /gateways/:id`: Updates an existing gateway in the database.
* `DELETE /gateways/:id`: Deletes a gateway and its associated devices from the database.

### Devices
* `GET /devices`: Returns a list of all devices.
* `POST /devices/:gatewayId`: Adds a new device to a specific gateway.
* `GET /devices/:gatewayId`: Returns a gateway with a list of all its devices.
* `GET /devices/:gatewayId/:deviceId`: Returns one device of a specified gateway.
* `PATCH /devices/:gatewayI/:deviceId`: Updates an existing device associated with a specific gateway.
* `DELETE /devices/:deviceId`: Deletes a device.

## Authentication
The GMS API uses JSON Web Tokens (JWT) for authentication. To access any of the endpoints, you'll need to include a valid JWT in the Authorization header of your requests.

To obtain a JWT, you'll need to make a POST request to the **/auth/login** endpoint with your email and password. The API will return a JWT, which you can then use to make requests to the other endpoints.

### Auth Endpoints
* `POST /auth/login`: Login with email and password.
* `POST /auth/register`: Register a new user.
* `GET /auth/access`: Verify if an user have a valid JWT.

## Tests
To run the tests for the GMS API, use the following command:
```
yarn test
```

## Built With
* Node.js
* NestJS
* MongoDB
* Passport/JWT

## License
This project is licensed under the MIT License.
