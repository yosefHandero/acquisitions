// tests/app.test.js
import app from '#src/app.js';
import request from 'supertest';
import { describe, it, expect } from '@jest/globals';

describe('API Endpoints', () => {
  describe('GET /health', () => {
    it('should return health status', async () => {
      const res = await request(app).get('/health').expect(200);
      expect(res.body.status).toBe('OK'); // <- was 'ok'
      expect(typeof res.body.timestamp).toBe('string');
      expect(typeof res.body.uptime).toBe('number');
    });
  });

  describe('GET /api', () => {
    it('should return API message', async () => {
      const res = await request(app).get('/api').expect(200);
      expect(res.body.message).toBe('Acquisitions API is running!'); // <- exact text
    });
  });

  describe('GET /nonexistent', () => {
    it('should return 404 for non-existent routes', async () => {
      const res = await request(app).get('/nonexistent').expect(404);
      expect(res.body.error).toBe('Route not found');
    });
  });
});
