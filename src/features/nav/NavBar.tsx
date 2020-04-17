import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";

interface IProps {
  openCreateForm: () => void;
}

export const NavBar: React.FC<IProps> = ({ openCreateForm }) => {
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
            onClick={openCreateForm}
            color="teal"
            content="Create Ticket"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};
