import { observable, action, computed } from "mobx";
import { createContext } from "react";
import { ITicket } from "../models/ticket";
import agent from "../api/agent";

class TicketStore {
  @observable ticketRegistry = new Map();
  @observable tickets: ITicket[] = [];
  @observable selectedTicket: ITicket | undefined = undefined;
  @observable loadingInitial = false;
  @observable editMode = false;
  @observable submitting = false;

  @computed get ticketsByDate() {
    return Array.from(this.ticketRegistry.values()).sort(
      (a, b) => Date.parse(a.dateModified) - Date.parse(b.dateModified)
    );
  }

  @action loadTickets = async () => {
    this.loadingInitial = true;
    try {
      const tickets = await agent.Tickets.list();
      tickets.forEach((ticket) => {
        ticket.dateFirst = ticket.dateFirst.split(".")[0];
        ticket.dateModified = ticket.dateModified.split(".")[0];
        ticket.dateDeadline = ticket.dateDeadline.split(".")[0];
        this.ticketRegistry.set(ticket.id, ticket);
      });
      this.loadingInitial = false;
    } catch (error) {
      console.log(error);
      this.loadingInitial = false;
    }
  };

  @action createTicket = async (ticket: ITicket) => {
    this.submitting = true;
    try {
      await agent.Tickets.create(ticket);
      this.ticketRegistry.set(ticket.id, ticket);
      this.editMode = false;
      this.submitting = false;
    } catch (error) {
      this.submitting = false;
      console.log(error);
    }
  };

  @action editTicket = async (ticket: ITicket) => {
    this.submitting = true;
    try {
      await agent.Tickets.update(ticket);
      this.ticketRegistry.set(ticket.id, ticket);
      this.selectedTicket = ticket;
      this.editMode = false;
      this.submitting = false;
    } catch (error) {
      this.submitting = false;
      console.log(error);
    }
  };

  @action openCreateForm = () => {
    this.editMode = true;
    this.selectedTicket = undefined;
  };

  @action openEditForm = (id: string) => {
    this.selectedTicket = this.ticketRegistry.get(id);
    this.editMode = true;
  };

  @action cancelSelectedTicket = () => {
    this.selectedTicket = undefined;
  };

  @action cancelFormOpen = () => {
    this.editMode = false;
  };

  @action selectTicket = (id: string) => {
    this.selectedTicket = this.ticketRegistry.get(id);
    this.editMode = false;
  };
}

export default createContext(new TicketStore());
