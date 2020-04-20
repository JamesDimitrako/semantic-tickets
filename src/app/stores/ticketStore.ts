import { observable, action, computed } from "mobx";
import { createContext } from "react";
import { ITicket } from "../models/ticket";
import agent from "../api/agent";

class TicketStore {
  @observable tickets: ITicket[] = [];
  @observable selectedTicket: ITicket | undefined = undefined;
  @observable loadingInitial = false;
  @observable editMode = false;
  @observable submitting = false;

  @computed get ticketsByDate() {
    return this.tickets.sort(
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
        this.tickets.push(ticket);
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
      this.tickets.push(ticket);
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

  @action selectTicket = (id: string) => {
    this.selectedTicket = this.tickets.find((a) => a.id === id);
    this.editMode = false;
  };
}

export default createContext(new TicketStore());
