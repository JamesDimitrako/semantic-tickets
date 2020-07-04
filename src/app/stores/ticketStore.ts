import { observable, action, computed, runInAction } from "mobx";
import { SyntheticEvent } from "react";
import { ITicket } from "../models/ticket";
import agent from "../api/agent";
import { history } from "../..";
import { toast } from "react-toastify";
import { RootStore } from "./rootStore";
import { setTicketProps } from "../common/util/util";

export default class TicketStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable ticketRegistry = new Map();
  @observable ticket: ITicket | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = "";

  @computed get ticketsByDate() {
    return this.groupTicketsByDate(Array.from(this.ticketRegistry.values()));
  }

  groupTicketsByDate(tickets: ITicket[]) {
    const sortedTickets = tickets.sort(
      (a, b) => a.dateFirst.getTime() - b.dateFirst.getTime()
    );
    return Object.entries(
      sortedTickets.reduce((tickets, ticket) => {
        const dateCreated = ticket.dateFirst.toISOString().split("T")[0];
        tickets[dateCreated] = tickets[dateCreated]
          ? [...tickets[dateCreated], ticket]
          : [ticket];
        return tickets;
      }, {} as { [key: string]: ITicket[] })
    );
  }

  @action loadTickets = async () => {
    this.loadingInitial = true;
    try {
      const tickets = await agent.Tickets.list();
      runInAction("loading tickets", () => {
        tickets.forEach((ticket) => {
          setTicketProps(ticket, this.rootStore.userStore.user!);
          this.ticketRegistry.set(ticket.id, ticket);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction("loading tickets error", () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };

  @action loadTicket = async (id: string) => {
    let ticket = this.getTicket(id);
    if (ticket) {
      this.ticket = ticket;
      return ticket;
    } else {
      this.loadingInitial = true;
      try {
        ticket = await agent.Tickets.details(id);
        runInAction("getting ticket", () => {
          setTicketProps(ticket, this.rootStore.userStore.user!);
          this.ticket = ticket;
          this.ticketRegistry.set(ticket.id, ticket);
          this.loadingInitial = false;
        });
        return ticket;
      } catch (error) {
        runInAction("getting ticket", () => {
          this.loadingInitial = false;
        });
      }
    }
  };

  @action clearTicket = () => {
    this.ticket = null;
  };

  getTicket = (id: string) => {
    return this.ticketRegistry.get(id);
  };

  @action createTicket = async (ticket: ITicket) => {
    this.submitting = true;
    try {
      await agent.Tickets.create(ticket);
      runInAction("create ticket", () => {
        this.ticketRegistry.set(ticket.id, ticket);
        this.submitting = false;
      });
      history.push(`/tickets/${ticket.id}`);
    } catch (error) {
      runInAction("create ticket action", () => {
        this.submitting = false;
      });
      toast.error("Problem submitting data");
      console.log(error.response);
    }
  };

  @action editTicket = async (ticket: ITicket) => {
    this.submitting = true;
    try {
      await agent.Tickets.update(ticket);
      runInAction("edit ticket", () => {
        this.ticketRegistry.set(ticket.id, ticket);
        this.ticket = ticket;
        this.submitting = false;
      });
    } catch (error) {
      runInAction("edit ticket error", () => {
        this.submitting = false;
      });
      console.log(error);
    }
  };

  @action deleteTicket = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Tickets.delete(id);
      runInAction("delete ticket", () => {
        this.ticketRegistry.delete(id);
        this.submitting = false;
        this.target = "";
      });
    } catch (error) {
      runInAction("delete ticket error", () => {
        this.submitting = false;
        this.target = "";
      });
      console.log(error);
    }
  };
}
