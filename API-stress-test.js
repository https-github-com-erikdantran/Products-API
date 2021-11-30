import http from 'k6/http';
import { sleep, check } from 'k6';

const url = 'http://localhost:5000/products/'

export const options = {
  vus: 5,
  duration: '30s',
};


export default function () {
  var route = Math.floor(Math.random() * 4) + 1
  var randomProductId = Math.floor(Math.random() * 1000012) + 1
  var endpoint
  if (route === 1) {
    endpoint = url
  } else if (route === 2) {
    endpoint = url + randomProductId
  } else if (route === 3) {
    endpoint = url + randomProductId + '/styles'
  } else {
    endpoint = url + randomProductId + '/related'
  }

  const res = http.get(endpoint);
  check(res, {
    'is status 200': r => r.status === 200,
    'transation time < 10ms': r => r.timings.duration < 10,
    'transation time < 20ms': r => r.timings.duration < 20,
    'transation time < 50ms': r => r.timings.duration < 50,
    'transation time < 100ms': r => r.timings.duration < 100,
    'transation time < 200ms': r => r.timings.duration < 200,
    'transation time < 1000ms': r => r.timings.duration < 1000,
    'transation time < 2000ms': r => r.timings.duration < 2000,
  });
  sleep(0.05);
};