import React, {
  useState,
  useEffect,
  Fragment,
  SyntheticEvent,
  useContext,
} from "react";
import { Container } from "semantic-ui-react";
import { ITicket } from "../models/ticket";
import { NavBar } from "../../features/nav/NavBar";
import { TicketDashboard } from "../../features/tickets/dashboard/TicketDashboard";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import TicketStore from "../stores/ticketStore";

const App = () => {
  const ticketStore = useContext(TicketStore);
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<ITicket | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState("");

  const handleSelectTicket = (id: string) => {
    setSelectedTicket(tickets.filter((t) => t.id === id)[0]);
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectedTicket(null);
    setEditMode(true);
  };

  const handleCreateTicket = (ticket: ITicket) => {
    setSubmitting(true);
    agent.Tickets.create(ticket)
      .then(() => {
        setTickets([...tickets, ticket]);
        setSelectedTicket(ticket);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };

  const handleEditTicket = (ticket: ITicket) => {
    setSubmitting(true);
    agent.Tickets.update(ticket)
      .then(() => {
        setTickets([...tickets.filter((t) => t.id !== ticket.id), ticket]);
        setSelectedTicket(ticket);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };

  const handleDeleteTicket = (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name);
    agent.Tickets.delete(id)
      .then(() => {
        setTickets([...tickets.filter((a) => a.id !== id)]);
      })
      .then(() => setSubmitting(false));
  };

  useEffect(() => {
    agent.Tickets.list()
      .then((response) => {
        let tickets: ITicket[] = [];
        response.forEach((ticket) => {
          ticket.dateFirst = ticket.dateFirst.split(".")[0];
          ticket.dateModified = ticket.dateModified.split(".")[0];
          ticket.dateDeadline = ticket.dateDeadline.split(".")[0];
          tickets.push(ticket);
        });
        setTickets(tickets);
      })
      .then(() => setLoading(false));
  }, []);

  if (loading) return <LoadingComponent content="Loading" />;

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
          deleteTicket={handleDeleteTicket}
          submitting={submitting}
          target={target}
        />
      </Container>
    </Fragment>
  );
};

export default App;
