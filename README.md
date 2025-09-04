# Request manager

A backend application built with **NestJS**, using **PostgreSQL**, **Redis**, and **RabbitMQ** for messaging.

## Tech Stack

- **Node.js**
- **NestJS**
- **PostgreSQL**
- **Redis**
- **RabbitMQ (3.11.4-management)**

## Prerequisites

Make sure you have the following installed:

- Node.js >= 18.x
- npm >= 9.x
- Docker & Docker Compose
- PrismaORM >= 6.15

## Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/BigBlueDraco/mind-force-test-task.git
cd mind-force-test-task.git
```

2. **Create dotenv**
   Create a `.env` file in the root of your project. Example:

```env
DATABASE_URL="postgres://root:example@localhost:5432/mind-force"
PORT = "3000"
BASE_URL = "http://localhost:3000"
RABBITMQ_URL = "amqp://user:password@localhost:5672"
REDIS_HOST = "localhost"
REDIS_PORT = "6379"
REDIS_PASSWORD = "my-password"
THROTTLE_TTL = 60000
THROTTLE_LIMIT = 1
```

3. **Prepare the project**

This will install dependencies, start docker, run migrations:

```bash
npm run prestart
```

4. **Start the application**

```bash
npm run start
```

The application should now be running and ready to use.

Default swagger link: http://localhost:3000/docs

## Useful Scripts

- `npm run prestart` – Prepare project before starting
- `npm run start` – Start NestJS application
- `npm run start:dev` – Start in development mode with hot reload
- `npm run test` – Run tests
