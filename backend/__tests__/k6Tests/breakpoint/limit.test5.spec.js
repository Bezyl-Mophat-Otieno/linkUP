import http from "k6/http";
import { sleep } from "k6";

export const options = {
  // Key configurations for Limit testing in the process Product Listing
  executor: "ramping-arrival-rate", //Assure load increase if the system slows
  stages: [
    { duration: "2h", target: 20000 }, // just slowly ramp-up to a HUGE load
  ],
};

export default () => {
  const url = "http://localhost:5000/api/v1/posts/fetch";
  sleep(1);

  http.get(url);
};
