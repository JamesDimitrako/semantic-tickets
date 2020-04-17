import { observable } from "mobx";
import { createContext } from "react";

class TicketStore {
  @observable title = "Hello from mobX";
}

export default createContext(new TicketStore());
