import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";
import TicketList from "./TicketList";
import TicketDetails from "../details/TicketDetails";
import TicketForm from "../form/TicketForm";
import { observer } from "mobx-react-lite";
import TicketStore from "../../../app/stores/ticketStore";

const TicketDashboard: React.FC = () => {
  const ticketStore = useContext(TicketStore);
  const { editMode, ticket } = ticketStore;
  return (
    <Grid>
      <Grid.Column width={10}>
        <TicketList />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(TicketDashboard);
