import React, { useState } from "react";
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

  return (
    <Segment clearing>
      <Form>
        <Form.Input placeholder="Title" value={ticket.title} />
        <Form.TextArea
          rows={2}
          placeholder="Description"
          value={ticket.description}
        />
        <Form.Input placeholder="Priority" value={ticket.priority} />
        <Form.Input placeholder="Category" value={ticket.category} />
        <Form.Input
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
