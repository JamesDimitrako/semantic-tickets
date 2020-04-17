import React from "react";
import { Grid } from "semantic-ui-react";
import { ITicket } from "../../../app/models/ticket";
import TicketList from "./TicketList";
import TicketDetails from "../details/TicketDetails";
import TicketForm from "../form/TicketForm";

interface IProps {
  tickets: ITicket[];
  selectTicket: (id: string) => void;
  selectedTicket: ITicket | null;
}

export const TicketDashboard: React.FC<IProps> = ({
  tickets,
  selectTicket,
  selectedTicket,
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <TicketList tickets={tickets} selectTicket={selectTicket} />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedTicket && <TicketDetails ticket={selectedTicket} />}
        <TicketForm />
      </Grid.Column>
    </Grid>
  );
};
