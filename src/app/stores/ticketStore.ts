import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { ITicket } from "../models/ticket";
import agent from "../api/agent";

configure({ enforceActions: "always" });

class TicketStore {
  @observable ticketRegistry = new Map();
  @observable tickets: ITicket[] = [];
  @observable ticket: ITicket | undefined;
  @observable loadingInitial = false;
  @observable editMode = false;
  @observable submitting = false;
  @observable target = "";

  @computed get ticketsByDate() {
    return Array.from(this.ticketRegistry.values()).sort(
      (a, b) => Date.parse(a.dateModified) - Date.parse(b.dateModified)
    );
  }

  @action loadTickets = async () => {
    this.loadingInitial = true;
    try {
      const tickets = await agent.Tickets.list();
      runInAction("loading tickets", () => {
        tickets.forEach((ticket) => {
          ticket.dateFirst = ticket.dateFirst.split(".")[0];
          ticket.dateModified = ticket.dateModified.split(".")[0];
          ticket.dateDeadline = ticket.dateDeadline.split(".")[0];
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
    } else {
      this.loadingInitial = true;
      try {
        ticket = await agent.Tickets.details(id);
        runInAction("getting ticket", () => {
          this.ticket = ticket;
          this.loadingInitial = false;
        });
      } catch (error) {
        runInAction("getting ticket", () => {
          this.loadingInitial = false;
        });
        console.log(error);
      }
    }
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
        this.editMode = false;
        this.submitting = false;
      });
    } catch (error) {
      runInAction("create ticket action", () => {
        this.submitting = false;
      });
      console.log(error);
    }
  };

  @action editTicket = async (ticket: ITicket) => {
    this.submitting = true;
    try {
      await agent.Tickets.update(ticket);
      runInAction("edit ticket", () => {
        this.ticketRegistry.set(ticket.id, ticket);
        this.ticket = ticket;
        this.editMode = false;
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

  @action openCreateForm = () => {
    this.editMode = true;
    this.ticket = undefined;
  };

  @action openEditForm = (id: string) => {
    this.ticket = this.ticketRegistry.get(id);
    this.editMode = true;
  };

  @action cancelSelectedTicket = () => {
    this.ticket = undefined;
  };

  @action cancelFormOpen = () => {
    this.editMode = false;
  };

  @action selectTicket = (id: string) => {
    this.ticket = this.ticketRegistry.get(id);
    this.editMode = false;
  };
}

export default createContext(new TicketStore());
