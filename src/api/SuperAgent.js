import superagentPromise from "superagent-promise";
import _superagent from "superagent";
import { baseURL } from "./baseURL";
const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = baseURL.APP_BASE_SIEM;

const responseBody = (res) => {
  return res.body;
};
const responseError = (error) => {
  return error.response.statusCode;
};

let token = null;
const tokenPlugin = (req) => {
  if (token) {
    req.set("authorization", `Bearer ${token}`);
  }
};

let requests = {
  del: (url) =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: (url, option = {}) =>
    superagent
      .get(`${API_ROOT}${url}`)
      .set(option)
      .use(tokenPlugin)
      .then(responseBody)
      .catch(responseError),
  put: (url, body) =>
    superagent
      .put(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
  post: (url, body) => {
    superagent
      .post(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody);
  },
};

const Auth = {
  login: (email, password) => {
    const apiuser = Buffer.from("hoant:Admin@123", "utf8").toString("base64");
    const option = {
      Authorization: `Basic ${apiuser}`,
    };
    return requests.get("/security/user/authenticate", option);
  },
};

const SuperAgent = {
  Auth,
  setToken: (_token) => {
    token = _token;
  },
};

export default SuperAgent;
