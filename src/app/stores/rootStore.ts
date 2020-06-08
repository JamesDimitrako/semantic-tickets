import TicketStore from "./ticketStore";
import UserStore from "./userStore";
import { createContext } from "react";
import { configure } from "mobx";
import CommonStore from "./commonStore";

configure({ enforceActions: "always" });

export class RootStore {
  ticketStore: TicketStore;
  userStore: UserStore;
  commonStore: CommonStore;

  constructor() {
    this.ticketStore = new TicketStore(this);
    this.userStore = new UserStore(this);
    this.commonStore = new CommonStore(this);
  }
}

export const RootStoreContext = createContext(new RootStore());
