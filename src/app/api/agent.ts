import axios, { AxiosResponse } from "axios";
import { ITicket } from "../models/ticket";
import { history } from "../..";
import { toast } from "react-toastify";
import { IUser, IUserFormValues } from "../models/user";
import { IProfile } from "../models/profile";

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("jwt");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(undefined, (error) => {
  if (error.message === "Network Error" && !error.response) {
    toast.error("Network error - make sure API is running!");
  }
  const { status, data, config } = error.response;
  if (status === 404) {
    history.push("/notfound");
  }
  if (
    status === 400 &&
    config.method === "get" &&
    data.errors.hasOwnProperty("id")
  ) {
    history.push("/notfound");
  }
  if (status === 500) {
    toast.error("Server error - check the terminal for more info!");
  }
  throw error.response;
});

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>((resolve) =>
    setTimeout(() => resolve(response), ms)
  );

const requests = {
  get: (url: string) => axios.get(url).then(sleep(1500)).then(responseBody),
  post: (url: string, body: {}) =>
    axios.post(url, body).then(sleep(1500)).then(responseBody),
  put: (url: string, body: {}) =>
    axios.put(url, body).then(sleep(1500)).then(responseBody),
  delete: (url: string) =>
    axios.delete(url).then(sleep(1500)).then(responseBody),
};

const Tickets = {
  list: (): Promise<ITicket[]> => requests.get("/tickets"),
  details: (id: string) => requests.get(`/tickets/${id}`),
  update: (ticket: ITicket) => requests.put(`/tickets/${ticket.id}`, ticket),
  create: (ticket: ITicket) => requests.post(`/tickets`, ticket),
  delete: (id: string) => requests.delete(`/tickets/${id}`),
  attend: (id: string) => requests.post(`/tickets/${id}/attend`, {}),
  unattend: (id: string) => requests.delete(`/tickets/${id}/attend`),
};

const User = {
  current: (): Promise<IUser> => requests.get("/user"),
  login: (user: IUserFormValues): Promise<IUser> =>
    requests.post(`/user/login`, user),
  register: (user: IUserFormValues): Promise<IUser> =>
    requests.post(`/user/register`, user),
};

const Profiles = {
  get: (username: string): Promise<IProfile> =>
    requests.get(`/profiles/${username}`),
};

export default {
  Tickets,
  User,
  Profiles,
};
