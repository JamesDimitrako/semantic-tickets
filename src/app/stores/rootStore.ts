import TicketStore from "./ticketStore";
import UserStore from "./userStore";
import { createContext } from "react";
import { configure } from "mobx";

configure({ enforceActions: "always" });

export class RootStore {
  ticketStore: TicketStore;
  userStore: UserStore;

  constructor() {
    this.ticketStore = new TicketStore(this);
    this.userStore = new UserStore(this);
  }
}

export const RootStoreContext = createContext(new RootStore());
