import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { ITicket } from "../../../app/models/ticket";
import { v4 as uuid } from "uuid";
import TicketStore from "../../../app/stores/ticketStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../app/common/form/TextInput";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import SelectInput from "../../../app/common/form/SelectInput";
import { category } from "../../../app/common/options/categoryOptions";

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

  // const handleSubmit = () => {
  //   if (ticket.id.length === 0) {
  //     let newTicket = {
  //       ...ticket,
  //       id: uuid(),
  //     };
  //     createTicket(newTicket).then(() =>
  //       history.push(`/tickets/${newTicket.id}`)
  //     );
  //   } else {
  //     editTicket(ticket).then(() => history.push(`/tickets/${ticket.id}`));
  //   }
  // };

  const handleFinalFormSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <label>Title</label>
                <Field
                  name="title"
                  placeholder="Title"
                  value={ticket.title}
                  component="input"
                />
                <label>Description</label>
                <Field
                  name="description"
                  placeholder="Description"
                  rows={3}
                  value={ticket.description}
                  component={TextAreaInput}
                />
                <label>Priority</label>
                <Field
                  component={TextInput}
                  name="priority"
                  placeholder="Priority"
                  value={ticket.priority}
                />
                <label>Category</label>
                <Field
                  component={SelectInput}
                  options={category}
                  name="category"
                  placeholder="Category"
                  value={ticket.category}
                />
                <label>Deadline</label>
                <Field
                  component={TextInput}
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
                  onClick={() => history.push("/tickets")}
                  floated="right"
                  content="Cancel"
                />
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(TicketForm);
