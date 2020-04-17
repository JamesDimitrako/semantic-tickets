import React, { useState, useEffect, Fragment } from "react";
import { Container } from "semantic-ui-react";
import axios from "axios";
import { ITicket } from "../models/ticket";
import { NavBar } from "../../features/nav/NavBar";
import { TicketDashboard } from "../../features/tickets/dashboard/TicketDashboard";

const App = () => {
  const [tickets, setTickets] = useState<ITicket[]>([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/tickets").then((response) => {
      setTickets(response.data);
    });
  }, []);

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <TicketDashboard tickets={tickets} />
      </Container>
    </Fragment>
  );
};

export default App;
