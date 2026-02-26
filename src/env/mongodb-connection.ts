import mongoose from 'mongoose';

/*
  The file contains the valid credentials to connect to MongoDB locally and in Autocode.

  For local development, please make sure to:
    - use docker-compose.mongodb.yml in the root directory
    - uncomment local development connection credentials below

  For running tests in Autocode:
    - comment out local development connection credentials below and uncomment Autocode ones
*/

// Local development

/* export const DB_USER = 'root';
export const DB_PASSWORD = 'nodegmp';
export const DB_NAME = 'test';
export const DB_HOST = 'localhost';
export const DB_PORT = 27017;

export const DB_CONNECTION_STRING = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`; */

// Autocode

export const DB_USER = ''; // no user credentials are needed for Autocode
export const DB_PASSWORD = ''; // same as above
export const DB_NAME = 'admin';
export const DB_HOST = 'localhost';
export const DB_PORT = 27017;

export const DB_CONNECTION_STRING = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

export const connect = async () => {
  await mongoose.connect(DB_CONNECTION_STRING);
};

export const disconnect = async () => {
  await mongoose.disconnect();
};
