import React, { useContext } from "react";
import { Item, Label, Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import TicketStore from "../../../app/stores/ticketStore";
import { ITicket } from "../../../app/models/ticket";

const TicketsListItem: React.FC<{ ticket: ITicket }> = ({ ticket }) => {
  const ticketStore = useContext(TicketStore);
  const { deleteTicket, submitting, target } = ticketStore;
  return (
    <Item key={ticket.id}>
      <Item.Content>
        <Item.Header as="a">{ticket.title}</Item.Header>
        <Item.Meta>Description</Item.Meta>

        <Item.Description>
          <div>{ticket.description}</div>
          <Label>
            Date Created
            <Label.Detail>{ticket.dateFirst}</Label.Detail>
          </Label>
          <Label>
            Date Modified
            <Label.Detail>{ticket.dateModified}</Label.Detail>
          </Label>
          <Label>
            Deadline
            <Label.Detail>{ticket.dateDeadline}</Label.Detail>
          </Label>
        </Item.Description>
        <Item.Extra>
          <Label basic content="Category" />

          <Button
            as={Link}
            to={`/tickets/${ticket.id}`}
            floated="right"
            color="teal"
            animated
          >
            <Button.Content visible>View</Button.Content>
            <Button.Content hidden>
              <Icon name="arrow right" />
            </Button.Content>
          </Button>
          <Button
            name={ticket.id}
            onClick={(e) => deleteTicket(e, ticket.id)}
            loading={target === ticket.id && submitting}
            floated="right"
            color="red"
            content="Delete"
          />
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

export default TicketsListItem;
