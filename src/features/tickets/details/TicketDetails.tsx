import React from "react";
import { Item, Segment, Label, Button } from "semantic-ui-react";
import { ITicket } from "../../../app/models/ticket";

interface IProps {
  ticket: ITicket;
  setEditMode: (editMode: boolean) => void;
}

const TicketDetails: React.FC<IProps> = ({ ticket, setEditMode }) => {
  return (
    <Segment clearing>
      <Item.Group divided>
        <Item>
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
            </Item.Extra>
            <Item.Extra>
              <Button.Group widths={2}>
                <Button
                  onClick={() => setEditMode(true)}
                  basic
                  color="teal"
                  content="Edit"
                />
                <Button
                  onClick={() => setEditMode(false)}
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

export default TicketDetails;
