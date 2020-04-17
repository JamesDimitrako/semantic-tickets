import React from "react";
import { Grid } from "semantic-ui-react";
import { ITicket } from "../../../app/models/ticket";
import TicketList from "./TicketList";
import TicketDetails from "../details/TicketDetails";
import TicketForm from "../form/TicketForm";

interface IProps {
  tickets: ITicket[];
}

export const TicketDashboard: React.FC<IProps> = ({ tickets }) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <TicketList tickets={tickets} />
        {/* <List>
          {tickets.map(ticket => (
            <List.Item key={ticket.id}>{ticket.title}</List.Item>
          ))}
        </List> */}
      </Grid.Column>
      <Grid.Column width={6}>
        <TicketDetails ticket={tickets[0]} />
        <TicketForm />
      </Grid.Column>
    </Grid>
  );
};
