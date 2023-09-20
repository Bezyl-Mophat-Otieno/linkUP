import http from "k6/http";
import { sleep } from "k6";

export const options = {
  // Key configurations for avg load test in Order Checkout
  stages: [
    { duration: "50s", target: 100 }, // traffic ramp-up from 1 to 100 users over 5 minutes.
    { duration: "1m", target: 100 }, // stay at 100 users for 30 minutes
    { duration: "50s", target: 0 }, // ramp-down to 0 users
  ],
  thresholds: {
    http_req_duration: ["p(95)<500"],
    http_req_failed: ["rate<0.03"],
  },
};

export default () => {
  const url = "http://localhost:5000/api/v1/products/create/order";
  const payload = JSON.stringify({
    user_id: "04dc36de-699c-400e-84d4-0bfc00aebc2e",
    name: "bread",
    price: 50,
    quantity: 10,
    total: 500.0,
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
      "application-type": "application/json",
    },
  };
  sleep(1);

  http.post(url, payload, params);
};
