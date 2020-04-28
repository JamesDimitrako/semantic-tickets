import React, { useContext, useEffect } from "react";
import { Item, Segment, Label, Button } from "semantic-ui-react";
import TicketStore from "../../../app/stores/ticketStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";

interface DetailsParams {
  id: string;
}

const TicketDetails: React.FC<RouteComponentProps<DetailsParams>> = ({
  match,
  history,
}) => {
  const ticketStore = useContext(TicketStore);
  const {
    ticket,
    openEditForm,
    cancelSelectedTicket,
    loadTicket,
    loadingInitial,
  } = ticketStore;

  useEffect(() => {
    loadTicket(match.params.id);
  }, [loadTicket]);

  if (loadingInitial || !ticket)
    return <LoadingComponent content="Loading ticket" />;

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
                  onClick={() => history.push("/tickets")}
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
