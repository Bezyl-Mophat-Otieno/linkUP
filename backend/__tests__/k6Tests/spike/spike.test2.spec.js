import http from "k6/http";
import { sleep } from "k6";

export const options = {
  // Key configurations for Spike testing in the process Order Checkout
  stages: [
    { duration: "1m", target: 2000 }, // traffic ramp-up from 1 to 2000 users over 1 min.
    { duration: "30s", target: 200 }, // stay at 100 users for 30 seconds
    { duration: "1s", target: 0 }, // ramp-down to 0 users
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
