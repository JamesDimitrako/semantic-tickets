import React, { useContext } from "react";
import { Item, Segment, Label, Button } from "semantic-ui-react";
import TicketStore from "../../../app/stores/ticketStore";
import { observer } from "mobx-react-lite";

const TicketDetails: React.FC = () => {
  const ticketStore = useContext(TicketStore);
  const {
    selectedTicket: ticket,
    openEditForm,
    cancelSelectedTicket,
  } = ticketStore;
  return (
    <Segment clearing>
      <Item.Group divided>
        <Item fixed="top">
          <Item.Content>
            <Item.Header as="a">{ticket!.title}</Item.Header>
            <Item.Meta>Description</Item.Meta>

            <Item.Description>
              <div>{ticket!.description}</div>
              <Label>
                Date Created
                <Label.Detail>{ticket!.dateFirst}</Label.Detail>
              </Label>
              <Label>
                Date Modified
                <Label.Detail>{ticket!.dateModified}</Label.Detail>
              </Label>
              <Label>
                Deadline
                <Label.Detail>{ticket!.dateDeadline}</Label.Detail>
              </Label>
            </Item.Description>
            <Item.Extra>
              <Label basic content="Category" />
            </Item.Extra>
            <Item.Extra>
              <Button.Group widths={2}>
                <Button
                  onClick={() => openEditForm(ticket!.id)}
                  basic
                  color="teal"
                  content="Edit"
                />
                <Button
                  onClick={cancelSelectedTicket}
                  basic
                  color="grey"
                  content="Cancel"
                />
              </Button.Group>
            </Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>
    </Segment>
  );
};

export default observer(TicketDetails);
