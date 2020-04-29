import React, { useEffect, Fragment, useContext } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import LoadingComponent from "./LoadingComponent";
import TicketStore from "../stores/ticketStore";
import { observer } from "mobx-react-lite";
import TicketDashboard from "../../features/tickets/dashboard/TicketDashboard";
import { Route, withRouter, RouteComponentProps } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import TicketForm from "../../features/tickets/form/TicketForm";
import TicketDetails from "../../features/tickets/details/TicketDetails";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  const ticketStore = useContext(TicketStore);

  useEffect(() => {
    ticketStore.loadTickets();
  }, [ticketStore]);

  if (ticketStore.loadingInitial) return <LoadingComponent content="Loading" />;

  return (
    <Fragment>
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Route exact path="/tickets" component={TicketDashboard} />
              <Route path="/tickets/:id" component={TicketDetails} />
              <Route
                key={location.key}
                path={["/createTicket", "/manage/:id"]}
                component={TicketForm}
              />
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
