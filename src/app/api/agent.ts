import axios, { AxiosResponse } from "axios";
import { ITicket } from "../models/ticket";

axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Tickets = {
  list: () => requests.get("/tickets"),
  details: (id: string) => requests.get(`/tickets/${id}`),
  update: (ticket: ITicket) => requests.put(`/tickets/${ticket.id}`, ticket),
  create: (ticket: ITicket) => requests.post(`/tickets`, ticket),
  delete: (id: string) => requests.delete(`/tickets/${id}`),
};

export default {
  Tickets,
};
