import './config';
import type { Server } from 'node:http';
import type { Socket } from 'node:net';
import bodyParser from 'body-parser';
import express from 'express';
import authRoutes from './auth/auth.routes';
import { config } from './config';
import { connect, disconnect } from './env/orm';
import healthRoutes from './health/health.routes';
import { errorHandler } from './middlewares/error.middleware';
import { requestLogger } from './middlewares/request-logger';
import productRoutes from './product/product.routes';
import logger from './utils/logger';

export const app = express();

app.use(bodyParser.json());
app.use(requestLogger);

app.use('/api/health', healthRoutes);

app.use('/api/auth', authRoutes);

app.use('/api/products', productRoutes);

app.use(errorHandler);

// Timeout constants for graceful shutdown
const GRACEFUL_SHUTDOWN_TIMEOUT = 10000; // 10 seconds
const FORCEFUL_EXIT_TIMEOUT = 20000; // 20 seconds

/**
 * Gracefully shuts down the server by closing all active connections and the server itself.
 * @param {Server} server - The HTTP server instance.
 * @param {Socket[]} connections - List of active connections to be closed.
 * @param {string} signal - The signal received that initiated the shutdown.
 */
export const shutdown = async (server: Server, connections: Socket[], signal: string) => {
  logger.info(`Received ${signal}. Shutting down gracefully...`);

  // Set a timer to forcefully exit after 20 seconds
  setTimeout(() => {
    logger.error('Forceful shutdown: Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, FORCEFUL_EXIT_TIMEOUT);

  // Set a timer to forcefully destroy connections after 10 seconds
  setTimeout(() => {
    logger.warn('Forcefully destroying remaining connections...');
    for (const connection of connections) {
      connection.destroy();
    }
  }, GRACEFUL_SHUTDOWN_TIMEOUT);

  // Gracefully end all connections
  for (const connection of connections) {
    connection.end();
  }

  server.close(() => {
    logger.info('Graceful shutdown completed');

    disconnect().catch((error) => {
      logger.error('Error closing database connection:', error);
    });

    process.exit(0);
  });
};

const PORT = config.PORT;

/**
 * Initializes and starts the HTTP server, and sets up handling for system signals
 * for graceful shutdown.
 * @returns {Server} The HTTP server instance.
 */
export const bootstrap = async () => {
  try {
    await connect();

    logger.info('Connected to PostgreSQL');
  } catch (error) {
    logger.error('Failed to connect to PostgreSQL:', error);
    process.exit(1);
  }

  const server = app.listen(PORT, () => {
    logger.info(`Server is started on port ${PORT}`);
  });

  // Track new connections to the server
  const connections: Socket[] = [];

  server.on('connection', (connection: Socket) => {
    connections.push(connection);

    // Remove connection from array when it closes
    connection.on('close', () => {
      const index = connections.indexOf(connection);
      if (index !== -1) {
        connections.splice(index, 1);
      }
    });
  });

  // Handle termination signals.
  process.on('SIGTERM', () => shutdown(server, connections, 'SIGTERM'));
  process.on('SIGINT', () => shutdown(server, connections, 'SIGINT'));

  return server;
};
