import React, { SyntheticEvent, useContext } from "react";
import { Grid } from "semantic-ui-react";
import { ITicket } from "../../../app/models/ticket";
import TicketList from "./TicketList";
import TicketDetails from "../details/TicketDetails";
import TicketForm from "../form/TicketForm";
import { observer } from "mobx-react-lite";
import TicketStore from "../../../app/stores/ticketStore";

const TicketDashboard: React.FC = () => {
  const ticketStore = useContext(TicketStore);
  const { editMode, selectedTicket } = ticketStore;
  return (
    <Grid>
      <Grid.Column width={10}>
        <TicketList />
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
