import React from "react";
import { Item, Label, Button, Icon } from "semantic-ui-react";
import {} from "../../../app/models/ticket";

const TicketList = () => {
  return (
    <Item.Group>
      <Item>
        <Item.Content>
          <Item.Header as="a">Title</Item.Header>
          <Item.Description>
            <div>Description</div>
            <Label>
              Date Created
              <Label.Detail>21/07/2019</Label.Detail>
            </Label>
          </Item.Description>
          <Item.Extra>
            <Label basic content="Category" />
            <Button floated="right" color="teal" animated>
              <Button.Content visible>View</Button.Content>
              <Button.Content hidden>
                <Icon name="arrow right" />
              </Button.Content>
            </Button>
          </Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>
  );
};

export default TicketList;
