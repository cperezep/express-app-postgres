describe('[Production-Ready Node.js Applications] Configuration and Environment Validation', () => {
  beforeEach(() => {
    jest.resetModules();
    process.env = {};
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.unmock('dotenv');
  });

  test('should load .env.production when NODE_ENV is production', () => {
    const dotenv = require('dotenv');
    const spy = jest.spyOn(dotenv, 'config');

    process.env.NODE_ENV = 'production';
    process.env.SECRET_KEY = 'a-secure-secret-key';
    process.env.DB_HOST = 'localhost';
    process.env.DB_NAME = 'testdb';
    process.env.DB_USER = 'testuser';
    process.env.DB_PASSWORD = 'testpassword';

    require('@/config');

    expect(spy).toHaveBeenCalledWith({ path: '.env.production' });
  });

  test('should load .env.test when NODE_ENV is test', () => {
    const dotenv = require('dotenv');
    const spy = jest.spyOn(dotenv, 'config');

    process.env.NODE_ENV = 'test';
    process.env.SECRET_KEY = 'a-secure-secret-key';
    process.env.DB_HOST = 'localhost';
    process.env.DB_NAME = 'testdb';
    process.env.DB_USER = 'testuser';
    process.env.DB_PASSWORD = 'testpassword';

    require('@/config');

    expect(spy).toHaveBeenCalledWith({ path: '.env.test' });
  });

  test('should fallback to .env.test when NODE_ENV is not defined', () => {
    const dotenv = require('dotenv');
    const spy = jest.spyOn(dotenv, 'config');

    process.env.SECRET_KEY = 'a-secure-secret-key';
    process.env.DB_HOST = 'localhost';
    process.env.DB_NAME = 'testdb';
    process.env.DB_USER = 'testuser';
    process.env.DB_PASSWORD = 'testpassword';

    require('@/config');

    expect(spy).toHaveBeenCalledWith({ path: '.env.test' });
  });

  test('should use default values for config when environment variables are missing', () => {
    jest.doMock('dotenv', () => ({ config: jest.fn() }));

    process.env.SECRET_KEY = 'a-secure-secret-key';
    process.env.DB_HOST = 'localhost';
    process.env.DB_NAME = 'testdb';
    process.env.DB_USER = 'testuser';
    process.env.DB_PASSWORD = 'testpassword';

    const { config } = require('@/config');
    expect(config).toEqual(
      expect.objectContaining({
        PORT: '8000',
        NODE_ENV: 'test',
        LOG_LEVEL: 'debug',
      }),
    );
  });

  test('should throw an error if a required environment variable is missing', () => {
    jest.doMock('dotenv', () => ({ config: jest.fn() }));

    process.env.PORT = '3000';
    process.env.NODE_ENV = 'test';

    expect(() => require('@/config')).toThrow('Invalid environment variables');
  });

  test('should not throw an error when all required variables are present', () => {
    jest.doMock('dotenv', () => ({ config: jest.fn() }));

    process.env.PORT = '3000';
    process.env.NODE_ENV = 'production';
    process.env.LOG_LEVEL = 'info';
    process.env.SECRET_KEY = 'a-secure-secret-key';
    process.env.DB_HOST = 'localhost';
    process.env.DB_PORT = '5432';
    process.env.DB_NAME = 'testdb';
    process.env.DB_USER = 'testuser';
    process.env.DB_PASSWORD = 'testpassword';

    expect(() => require('@/config')).not.toThrow();
  });
});
