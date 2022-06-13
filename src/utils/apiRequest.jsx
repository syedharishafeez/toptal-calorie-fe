const axios = require("axios");
const BASE_URL = `http://localhost:5000`;

async function makeRequest({ method, url, body }) {
  const config = {
    method,
    url: BASE_URL + url,
    headers: {
      "Content-Type": "application/json",
    },
    data: body ? body : {},
  };
  try {
    let res = await axios(config);
    return res.data;
  } catch (ex) {
    return ex;
  }
}

export { makeRequest };
