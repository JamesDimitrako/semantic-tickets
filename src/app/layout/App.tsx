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
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectedTicket(null);
    setEditMode(true);
  };

  const handleCreateTicket = (ticket: ITicket) => {
    setTickets([...tickets, ticket]);
    setSelectedTicket(ticket);
    setEditMode(false);
  };

  const handleEditTicket = (ticket: ITicket) => {
    setTickets([...tickets.filter((t) => t.id !== ticket.id), ticket]);
    setSelectedTicket(ticket);
    setEditMode(false);
  };

  useEffect(() => {
    axios
      .get<ITicket[]>("http://localhost:5000/api/tickets")
      .then((response) => {
        let tickets: ITicket[] = [];
        response.data.forEach((ticket) => {
          ticket.dateFirst = ticket.dateFirst.split(".")[0];
          ticket.dateModified = ticket.dateModified.split(".")[0];
          ticket.dateDeadline = ticket.dateDeadline.split(".")[0];
          tickets.push(ticket);
        });
        setTickets(tickets);
      });
  }, []);

  return (
    <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: "7em" }}>
        <TicketDashboard
          tickets={tickets}
          selectTicket={handleSelectTicket}
          selectedTicket={selectedTicket!}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedTicket={setSelectedTicket}
          createTicket={handleCreateTicket}
          editTicket={handleEditTicket}
        />
      </Container>
    </Fragment>
  );
};

export default App;
