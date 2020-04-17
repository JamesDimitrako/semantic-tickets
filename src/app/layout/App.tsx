import React, { useState, useEffect, Fragment } from "react";
import { List, Container } from "semantic-ui-react";
import axios from "axios";
import { ITicket } from "../models/ticket";
import { NavBar } from "../../features/nav/NavBar";

const App = () => {
  const [tickets, setTickets] = useState<ITicket[]>([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/tickets").then(response => {
      setTickets(response.data);
    });
  }, []);

  return (
    <Fragment>
      <NavBar />
      <Container style={{marginTop: '7em'}}>
        <List>
          {tickets.map(ticket => (
            <List.Item key={ticket.id}>{ticket.title}</List.Item>
          ))}
        </List>
      </Container>
    </Fragment>
  );
};

export default App;
