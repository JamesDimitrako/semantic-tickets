import React, { SyntheticEvent, useContext } from "react";
import { Item, Label, Button, Icon, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import TicketStore from "../../../app/stores/ticketStore";

interface IProps {
  deleteTicket: (e: SyntheticEvent<HTMLButtonElement>, id: string) => void;
  submitting: boolean;
  target: string;
}

const TicketList: React.FC<IProps> = ({ deleteTicket, submitting, target }) => {
  const ticketStore = useContext(TicketStore);
  const { tickets, selectTicket } = ticketStore;
  return (
    <Segment clearing>
      <Item.Group divided>
        {tickets.map((ticket) => (
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
                  onClick={() => selectTicket(ticket.id)}
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
        ))}
      </Item.Group>
    </Segment>
  );
};

export default observer(TicketList);
