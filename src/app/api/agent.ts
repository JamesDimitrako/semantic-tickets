import axios, { AxiosResponse } from "axios";
import { ITicket } from "../models/ticket";

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(undefined, (error) => {
  console.log(error.response);
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
};

export default {
  Tickets,
};
