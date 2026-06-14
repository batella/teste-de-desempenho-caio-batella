import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 1,
  duration: '30s',
  thresholds: {
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const res = http.get('http://localhost:3000/health');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'status is UP': (r) => JSON.parse(r.body).status === 'UP',
  });
}
