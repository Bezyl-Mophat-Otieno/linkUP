import http from "k6/http";
import { sleep } from "k6";

// Making sure the Product Listing works under minimal load
export const options = {
  vus: 1,
  duration: "1s",
  thresholds: {
    http_req_duration: ["p(95)<500"],
    http_req_failed: ["rate<0.01"],
  },
};

export default () => {
  const url = "http://localhost:5000/api/v1/products/fetch";
  sleep(1);

  http.get(url);
};
