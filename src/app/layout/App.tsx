import React, { useEffect, Fragment, useContext } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import LoadingComponent from "./LoadingComponent";
import TicketStore from "../stores/ticketStore";
import { observer } from "mobx-react-lite";
import TicketDashboard from "../../features/tickets/dashboard/TicketDashboard";

const App = () => {
  const ticketStore = useContext(TicketStore);

  useEffect(() => {
    ticketStore.loadTickets();
  }, [ticketStore]);

  if (ticketStore.loadingInitial) return <LoadingComponent content="Loading" />;

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <TicketDashboard />
      </Container>
    </Fragment>
  );
};

export default observer(App);
