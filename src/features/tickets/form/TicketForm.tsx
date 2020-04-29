import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { ITicket } from "../../../app/models/ticket";
import { v4 as uuid } from "uuid";
import TicketStore from "../../../app/stores/ticketStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";

interface DetailsParams {
  id: string;
}

const TicketForm: React.FC<RouteComponentProps<DetailsParams>> = ({
  match,
  history,
}) => {
  const ticketStore = useContext(TicketStore);
  const {
    createTicket,
    editTicket,
    submitting,
    cancelSelectedTicket,
    ticket: initialFormState,
    loadTicket,
    clearTicket,
  } = ticketStore;

  const [ticket, setTicket] = useState<ITicket>({
    id: "",
    title: "",
    description: "",
    priority: "",
    category: "",
    dateFirst: "",
    dateModified: "",
    dateDeadline: "",
  });

  useEffect(() => {
    if (match.params.id && ticket.id.length === 0) {
      loadTicket(match.params.id).then(
        () => initialFormState && setTicket(initialFormState)
      );
    }

    return () => {
      clearTicket();
    };
  }, [
    loadTicket,
    clearTicket,
    match.params.id,
    initialFormState,
    ticket.id.length,
  ]);

  const handleSubmit = () => {
    if (ticket.id.length === 0) {
      let newTicket = {
        ...ticket,
        id: uuid(),
      };
      createTicket(newTicket).then(() =>
        history.push(`/tickets/${newTicket.id}`)
      );
    } else {
      editTicket(ticket).then(() => history.push(`/tickets/${ticket.id}`));
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setTicket({ ...ticket, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInputChange}
          name="title"
          placeholder="Title"
          value={ticket.title}
        />
        <Form.TextArea
          onChange={handleInputChange}
          name="description"
          rows={2}
          placeholder="Description"
          value={ticket.description}
        />
        <Form.Input
          onChange={handleInputChange}
          name="priority"
          placeholder="Priority"
          value={ticket.priority}
        />
        <Form.Input
          onChange={handleInputChange}
          name="category"
          placeholder="Category"
          value={ticket.category}
        />
        <Form.Input
          onChange={handleInputChange}
          name="deadline"
          type="date"
          placeholder="Deadline"
          value={ticket.dateDeadline}
        />
        <Button
          loading={submitting}
          floated="right"
          color="teal"
          type="submit"
          content="Submit"
        />
        <Button
          onClick={cancelSelectedTicket}
          floated="right"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default observer(TicketForm);
