import type { Server } from 'node:http';
import type { Socket } from 'node:net';
import bodyParser from 'body-parser';
import express from 'express';
import { connect, disconnect } from './env/orm';
import { errorHandler } from './middlewares/error.middleware';
import { requestLogger } from './middlewares/request-logger';
import productRoutes from './product/product.routes';

export const app = express();

app.use(bodyParser.json());
app.use(requestLogger);

app.use('/api/products', productRoutes);

app.use(errorHandler);

/**
 * TODO: Module 10 - Production-Ready Node.js Applications
 * Gracefully shuts down the server by closing all active connections and the server itself.
 * @param {Server} server - The HTTP server instance.
 * @param {Socket[]} connections - List of active connections to be closed.
 * @param {string} signal - The signal received that initiated the shutdown.
 */
export const shutdown = async (server: Server, connections: Socket[], signal: string) => {
  // biome-ignore lint: intentional debugging
  console.log(`Received ${signal}. Shutting down gracefully...`);

  for (const connection of connections) {
    connection.destroy();
  }

  server.close(async () => {
    // biome-ignore lint: intentional debugging
    console.log('HTTP server closed');
    await disconnect();
    // biome-ignore lint: intentional debugging
    console.log('Database connection closed');
    process.exit(0);
  });
};

const PORT = 8000;

/**
 * Initializes and starts the HTTP server, and sets up handling for system signals
 * for graceful shutdown.
 * @returns {Server} The HTTP server instance.
 */
export const bootstrap = async () => {
  try {
    await connect();
    // biome-ignore lint: intentional debugging
    console.log('Connected to PostgreSQL');
  } catch (error) {
    // biome-ignore lint: intentional debugging
    console.error('Failed to connect to PostgreSQL:', error);
    process.exit(1);
  }

  const server = app.listen(PORT, () => {
    // biome-ignore lint: intentional debugging
    console.log(`Server is started on port ${PORT}`);
  });

  // TODO: Module 10 - Production-Ready Node.js Applications
  // Track new connections to the server
  // const connections: Socket[] = [];

  // Handle termination signals.
  // process.on('SIGTERM', () => shutdown(server, connections, 'SIGTERM'));
  // process.on('SIGINT', () => shutdown(server, connections, 'SIGINT'));

  return server;
};
