import React, { useState, FormEvent } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { ITicket } from "../../../app/models/ticket";

interface IProps {
  setEditMode: (editMode: boolean) => void;
  ticket: ITicket;
}

const TicketForm: React.FC<IProps> = ({
  setEditMode,
  ticket: initialFormState,
}) => {
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
    console.log(ticket);
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
        <Button floated="right" color="teal" type="submit" content="Submit" />
        <Button
          onClick={() => setEditMode(false)}
          floated="right"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default TicketForm;
