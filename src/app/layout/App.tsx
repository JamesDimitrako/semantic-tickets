import React, { useState, useEffect, Fragment } from "react";
import { Container } from "semantic-ui-react";
import axios from "axios";
import { ITicket } from "../models/ticket";
import { NavBar } from "../../features/nav/NavBar";
import { TicketDashboard } from "../../features/tickets/dashboard/TicketDashboard";

const App = () => {
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<ITicket | null>(null);
  const [editMode, setEditMode] = useState(false);

  const handleSelectTicket = (id: string) => {
    setSelectedTicket(tickets.filter((t) => t.id === id)[0]);
  };

  useEffect(() => {
    axios.get("http://localhost:5000/api/tickets").then((response) => {
      setTickets(response.data);
    });
  }, []);

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <TicketDashboard
          tickets={tickets}
          selectTicket={handleSelectTicket}
          selectedTicket={selectedTicket!}
          editMode={editMode}
          setEditMode={setEditMode}
        />
      </Container>
    </Fragment>
  );
};

export default App;
