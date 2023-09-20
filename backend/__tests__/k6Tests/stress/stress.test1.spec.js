import http from "k6/http";
import { sleep } from "k6";

export const options = {
  // Key configurations for stress load test in users Login
  stages: [
    { duration: "50s", target: 200 }, // traffic ramp-up from 1 to 100 users over 5 minutes.
    { duration: "1m", target: 200 }, // stay at 100 users for 30 minutes
    { duration: "50s", target: 0 }, // ramp-down to 0 users
  ],
  thresholds: {
    http_req_duration: ["p(95)<500"],
    http_req_failed: ["rate<0.03"],
  },
};

export default () => {
  const url = "http://localhost:5000/api/v1/users/login";
  const payload = JSON.stringify({
    email: "bezylmophatotieno@gmail.com",
    password: "12345",
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
      "application-type": "application/json",
    },
  };

  http.post(url, payload, params);
  sleep(1);
};
