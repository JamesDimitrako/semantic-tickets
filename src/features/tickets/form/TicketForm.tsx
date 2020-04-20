import React, { useState, FormEvent, useContext } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { ITicket } from "../../../app/models/ticket";
import { v4 as uuid } from "uuid";
import TicketStore from "../../../app/stores/ticketStore";
import { observer } from "mobx-react-lite";

interface IProps {
  setEditMode: (editMode: boolean) => void;
  ticket: ITicket;
  editTicket: (ticket: ITicket) => void;
  submitting: boolean;
}

const TicketForm: React.FC<IProps> = ({
  setEditMode,
  ticket: initialFormState,
  editTicket,
  submitting,
}) => {
  const ticketStore = useContext(TicketStore);
  const { createTicket } = ticketStore;
  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        id: "",
        title: "",
        description: "",
        priority: "",
        category: "",
        dateFirst: "",
        dateModified: "",
        dateDeadline: "",
      };
    }
  };

  const [ticket, setTicket] = useState<ITicket>(initializeForm);

  const handleSubmit = () => {
    if (ticket.id.length === 0) {
      let newTicket = {
        ...ticket,
        id: uuid(),
      };
      createTicket(newTicket);
    } else {
      editTicket(ticket);
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
          onClick={() => setEditMode(false)}
          floated="right"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default observer(TicketForm);
