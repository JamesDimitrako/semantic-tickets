import React from "react";
import { Segment, Form } from "semantic-ui-react";

const TicketForm = () => {
  return (
    <Segment>
      <Form>
        <Form.Input placeholder="Title" />
        <Form.TextArea rows={2} placeholder="Description" />
        <Form.Input placeholder="Priority" />
        <Form.Input placeholder="Category" />
        <Form.Input type="date" placeholder="Deadline" />
      </Form>
    </Segment>
  );
};

export default TicketForm;
