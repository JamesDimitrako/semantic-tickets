import React from "react";
import { Grid, List } from "semantic-ui-react";
import { ITicket } from "../../../app/models/ticket";

interface IProps {
    tickets: ITicket[]
}

export const TicketDashboard: React.FC<IProps> = ({tickets}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <List>
          {tickets.map(ticket => (
            <List.Item key={ticket.id}>{ticket.title}</List.Item>
          ))}
        </List>
      </Grid.Column>
    </Grid>
  );
};
