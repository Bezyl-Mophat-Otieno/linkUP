import http from "k6/http";
import { sleep } from "k6";

export const options = {
  // Key configurations for Spike testing in the process User Registration
  stages: [
    { duration: "1m", target: 2000 }, // traffic ramp-up from 1 to 2000 users in 1 min.
    { duration: "30s", target: 200 }, // stay at 200 users for 30 minutes
    { duration: "1s", target: 0 }, // ramp-down to 0 users
  ],
  thresholds: {
    http_req_duration: ["p(95)<500"],
    http_req_failed: ["rate<0.03"],
  },
};

export default () => {
  const url = "http://localhost:5000/api/v1/users/add";
  const payload = JSON.stringify({
    username: "John Doe",
    email: "johndoe@gmail.com",
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
