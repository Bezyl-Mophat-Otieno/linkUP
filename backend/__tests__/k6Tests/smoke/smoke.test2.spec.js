import http from "k6/http";

// Making sure the basic Checkout works under minimal load
export const options = {
  vus: 1,
  duration: "1s",
  thresholds: {
    http_req_duration: ["p(95)<500"],
    http_req_failed: ["rate<0.01"],
  },
};

export default function () {
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

  http.post(url, payload, params);
  sleep(1);
}
