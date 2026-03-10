## Node.js Express Application

### Installing Dependencies

To ensure that you have all the necessary packages for the application, clear any existing node modules and install dependencies fresh:

```
rm -rf node_modules && npm i
```

### Starting the Database Locally

#### PostgreSQL

**Please note**: Use `podman-compose` commands unless you have a Docker license.

```
## start container
podman-compose --env-file .env.production up -d
docker-compose --env-file .env.production up -d

## stop container
podman-compose down
docker-compose down
```

### Environment Setup

Copy the example files and fill in your values:

```bash
# For production/development
cp .env.example .env.production

# For running tests
cp .env.test.example .env.test

### Starting the Development Server

Run the server in development mode with hot reload capabilities:

```
npm run start:dev
```

### Running Tests

Please note that this command wll automatically start and stop server, no need to run `npm run start:dev` before.

```
npm test
```
