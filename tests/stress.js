import http from 'k6/http';
import { check } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 200 },
    { duration: '2m', target: 500 },
    { duration: '2m', target: 1000 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.10'],
  },
};

export default function () {
  const payload = JSON.stringify({ userId: 1, items: [{ id: 202, qty: 1 }] });
  const params = { headers: { 'Content-Type': 'application/json' } };

  const res = http.post('http://localhost:3000/checkout/crypto', payload, params);
  check(res, {
    'status is 201': (r) => r.status === 201,
  });
}
