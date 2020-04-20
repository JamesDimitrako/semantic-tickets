import React, { useContext } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import TicketStore from "../../app/stores/ticketStore";
import { observer } from "mobx-react-lite";

const NavBar: React.FC = () => {
  const ticketStore = useContext(TicketStore);
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header>
          <img
            src="./assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
        </Menu.Item>
        <Menu.Item name="Tickets" />
        <Menu.Item>
          <Button
            onClick={ticketStore.openCreateForm}
            color="teal"
            content="Create Ticket"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
