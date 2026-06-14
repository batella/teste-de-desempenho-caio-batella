import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 50 },
    { duration: '2m', target: 50 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const payload = JSON.stringify({ userId: 1, items: [{ id: 101, qty: 2 }] });
  const params = { headers: { 'Content-Type': 'application/json' } };

  const res = http.post('http://localhost:3000/checkout/simple', payload, params);
  check(res, {
    'status is 201': (r) => r.status === 201,
    'status is APPROVED': (r) => r.body && JSON.parse(r.body).status === 'APPROVED',
  });

  sleep(1);
}
