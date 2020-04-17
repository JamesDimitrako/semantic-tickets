import React from "react";
import { Item, Label, Button, Icon, Segment } from "semantic-ui-react";
import { ITicket } from "../../../app/models/ticket";

interface IProps {
  tickets: ITicket[];
  selectTicket: (id: string) => void;
  deleteTicket: (id: string) => void;
}

const TicketList: React.FC<IProps> = ({
  tickets,
  selectTicket,
  deleteTicket,
}) => {
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
                  onClick={() => deleteTicket(ticket.id)}
                  basic
                  floated="right"
                  color="red"
                  content="Delete"
                />
                <Button floated="right" color="teal" animated>
                  <Button.Content visible>View</Button.Content>
                  <Button.Content
                    onClick={() => selectTicket(ticket.id)}
                    hidden
                  >
                    <Icon name="arrow right" />
                  </Button.Content>
                </Button>
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default TicketList;
