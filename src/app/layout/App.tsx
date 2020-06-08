import React, { Fragment } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import { observer } from "mobx-react-lite";
import TicketDashboard from "../../features/tickets/dashboard/TicketDashboard";
import {
  Route,
  withRouter,
  RouteComponentProps,
  Switch,
} from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import TicketForm from "../../features/tickets/form/TicketForm";
import TicketDetails from "../../features/tickets/details/TicketDetails";
import NotFound from "./NotFound";
import { ToastContainer } from "react-toastify";
import LoginForm from "../../features/user/LoginForm";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <Fragment>
      <ToastContainer position="bottom-right" />
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <Route exact path="/tickets" component={TicketDashboard} />
                <Route path="/tickets/:id" component={TicketDetails} />
                <Route
                  key={location.key}
                  path={["/createTicket", "/manage/:id"]}
                  component={TicketForm}
                />
                <Route path="/login" component={LoginForm} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
