import http from "k6/http";
import { sleep } from "k6";

export const options = {
  // Key configurations for endurance testing in the process User Registration
  stages: [
    { duration: "50m", target: 200 }, // traffic ramp-up from 1 to 100 users over 50 minutes.
    { duration: "1h", target: 200 }, // stay at 100 users for 1hr
    { duration: "50m", target: 0 }, // ramp-down to 0 users
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
