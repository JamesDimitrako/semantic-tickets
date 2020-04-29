import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import TicketStore from "../../../app/stores/ticketStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import TicketDetailedHeader from "./TicketDetailedHeader";
import TicketDetailedInfo from "./TicketDetailedInfo";
import TicketDetailedChat from "./TicketDetailedChat";
import TicketDetailedSidebar from "./TicketDetailedSidebar";

interface DetailsParams {
  id: string;
}

const TicketDetails: React.FC<RouteComponentProps<DetailsParams>> = ({
  match,
}) => {
  const ticketStore = useContext(TicketStore);
  const { ticket, loadTicket, loadingInitial } = ticketStore;

  useEffect(() => {
    loadTicket(match.params.id);
  }, [loadTicket, match.params.id]);

  if (loadingInitial || !ticket)
    return <LoadingComponent content="Loading ticket" />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <TicketDetailedHeader ticket={ticket} />
        <TicketDetailedInfo ticket={ticket} />
        <TicketDetailedChat ticket={ticket} />
      </Grid.Column>
      <Grid.Column width={6}>
        <TicketDetailedSidebar />
      </Grid.Column>
    </Grid>
  );
};

export default observer(TicketDetails);
