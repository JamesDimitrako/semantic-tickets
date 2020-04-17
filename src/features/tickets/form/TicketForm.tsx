import React from "react";
import { Segment, Form, Button } from "semantic-ui-react";

interface IProps {
  setEditMode: (editMode: boolean) => void;
}

const TicketForm: React.FC<IProps> = ({ setEditMode }) => {
  return (
    <Segment clearing>
      <Form>
        <Form.Input placeholder="Title" />
        <Form.TextArea rows={2} placeholder="Description" />
        <Form.Input placeholder="Priority" />
        <Form.Input placeholder="Category" />
        <Form.Input type="date" placeholder="Deadline" />
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
