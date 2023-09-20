import http from "k6/http";
import { sleep } from "k6";

export const options = {
  // Key configurations for endurance testing in the process Product Listing
  stages: [
    { duration: "50m", target: 200 }, // traffic ramp-up from 1 to 100 users over 5 minutes.
    { duration: "1h", target: 200 }, // stay at 100 users for 30 minutes
    { duration: "50m", target: 0 }, // ramp-down to 0 users
  ],
  thresholds: {
    http_req_duration: ["p(95)<500"],
    http_req_failed: ["rate<0.03"],
  },
};

export default () => {
  const url =
    "http://localhost:5000/api/v1/followers/notFollowed/581877a5-0830-4ef6-bdc6-3bd08969d807";
  sleep(1);

  http.get(url);
};
