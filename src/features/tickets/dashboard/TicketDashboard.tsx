import React from "react";
import { Grid } from "semantic-ui-react";
import TicketList from "./TicketList";
import { observer } from "mobx-react-lite";

const TicketDashboard: React.FC = () => {
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
