import request from 'supertest';

const API_HOST = 'http://localhost:8000';

describe('[Production-Ready Node.js Applications] Healthcheck endpoint /api/health', () => {
  test('should return 200 if server is up and running', async () => {
    const { body } = await request(API_HOST).get('/api/health').expect(200);
    expect(body).toEqual({ status: 'OK', uptime: expect.any(Number) });
  });
});
