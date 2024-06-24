import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "d266c14a764b4222b8659800c4534ae5",
  },
});
