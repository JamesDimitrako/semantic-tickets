import React from "react";
import { Grid } from "semantic-ui-react";
import { ITicket } from "../../../app/models/ticket";
import TicketList from "./TicketList";

interface IProps {
  tickets: ITicket[];
}

export const TicketDashboard: React.FC<IProps> = ({ tickets }) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <TicketList />
        {/* <List>
          {tickets.map(ticket => (
            <List.Item key={ticket.id}>{ticket.title}</List.Item>
          ))}
        </List> */}
      </Grid.Column>
    </Grid>
  );
};
