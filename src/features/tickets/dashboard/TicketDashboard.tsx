import React, { SyntheticEvent, useContext } from "react";
import { Grid } from "semantic-ui-react";
import { ITicket } from "../../../app/models/ticket";
import TicketList from "./TicketList";
import TicketDetails from "../details/TicketDetails";
import TicketForm from "../form/TicketForm";
import { observer } from "mobx-react-lite";
import TicketStore from "../../../app/stores/ticketStore";

interface IProps {
  tickets: ITicket[];
  deleteTicket: (e: SyntheticEvent<HTMLButtonElement>, id: string) => void;
  submitting: boolean;
  target: string;
}

const TicketDashboard: React.FC<IProps> = ({
  deleteTicket,
  submitting,
  target,
}) => {
  const ticketStore = useContext(TicketStore);
  const { editMode, selectedTicket } = ticketStore;
  return (
    <Grid>
      <Grid.Column width={10}>
        <TicketList
          deleteTicket={deleteTicket}
          submitting={submitting}
          target={target}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedTicket && !editMode && <TicketDetails />}
        {editMode && (
          <TicketForm
            key={(selectedTicket && selectedTicket.id) || 0}
            ticket={selectedTicket!}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default observer(TicketDashboard);
