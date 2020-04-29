import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import TicketList from "./TicketList";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import TicketStore from "../../../app/stores/ticketStore";

const TicketDashboard: React.FC = () => {
  const ticketStore = useContext(TicketStore);

  useEffect(() => {
    ticketStore.loadTickets();
  }, [ticketStore]);

  if (ticketStore.loadingInitial) return <LoadingComponent content="Loading" />;

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
