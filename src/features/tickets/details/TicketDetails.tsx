import React, { useContext } from "react";
import { Item, Segment, Label, Button } from "semantic-ui-react";
import { ITicket } from "../../../app/models/ticket";
import TicketStore from "../../../app/stores/ticketStore";
import { observer } from "mobx-react-lite";

interface IProps {
  setEditMode: (editMode: boolean) => void;
  setSelectedActivity: (activity: ITicket | null) => void;
}

const TicketDetails: React.FC<IProps> = ({
  setEditMode,
  setSelectedActivity,
}) => {
  const ticketStore = useContext(TicketStore);
  const { selectedTicket: ticket } = ticketStore;
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
                  onClick={() => setEditMode(true)}
                  basic
                  color="teal"
                  content="Edit"
                />
                <Button
                  onClick={() => setSelectedActivity(null)}
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
