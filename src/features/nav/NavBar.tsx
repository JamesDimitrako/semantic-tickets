import React, { useContext } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import TicketStore from "../../app/stores/ticketStore";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";

const NavBar: React.FC = () => {
  const ticketStore = useContext(TicketStore);
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header as={NavLink} exact to="/">
          <img
            src="./assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
        </Menu.Item>
        <Menu.Item name="Tickets" as={NavLink} to="/tickets" />
        <Menu.Item>
          <Button
            as={NavLink}
            to="/createTicket"
            color="teal"
            content="Create Ticket"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
