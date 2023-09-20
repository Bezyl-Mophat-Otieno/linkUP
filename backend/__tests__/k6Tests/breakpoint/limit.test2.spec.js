import http from "k6/http";
import { sleep } from "k6";

export const options = {
  // Key configurations for Limit testing in the process User Registration
  executor: "ramping-arrival-rate", //Assure load increase if the system slows
  stages: [
    { duration: "2h", target: 20000 }, // just slowly ramp-up to a HUGE load
  ],
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
