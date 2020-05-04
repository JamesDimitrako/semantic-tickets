import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import {
  ITicketFormValues,
  TicketFormValues,
} from "../../../app/models/ticket";
import { v4 as uuid } from "uuid";
import TicketStore from "../../../app/stores/ticketStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../app/common/form/TextInput";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import SelectInput from "../../../app/common/form/SelectInput";
import { category } from "../../../app/common/options/categoryOptions";
import DateInput from "../../../app/common/form/DateInput";
import { combineDateAndTime } from "../../../app/common/util/util";

interface DetailsParams {
  id: string;
}

const TicketForm: React.FC<RouteComponentProps<DetailsParams>> = ({
  match,
  history,
}) => {
  const ticketStore = useContext(TicketStore);
  const { submitting, ticket: initialFormState, loadTicket } = ticketStore;

  const [ticket, setTicket] = useState(new TicketFormValues());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadTicket(match.params.id)
        .then((ticket) => setTicket(new TicketFormValues(ticket)))
        .finally(() => setLoading(false));
    }
  }, [loadTicket, match.params.id]);

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
    const dateAndTime = combineDateAndTime(values.date, values.time);
    const { date, time, ...ticket } = values;
    ticket.dateDeadline = dateAndTime;
    console.log(ticket);
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            initialValues={ticket}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
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
                <Form.Group widths="equal">
                  <Field
                    component={DateInput}
                    name="date"
                    date={true}
                    placeholder="Deadline"
                    value={ticket.dateDeadline}
                  />
                  <Field
                    component={DateInput}
                    name="time"
                    time={true}
                    placeholder="Deadline"
                    value={ticket.time}
                  />
                </Form.Group>

                <Button
                  loading={submitting}
                  disabled={loading}
                  floated="right"
                  color="teal"
                  type="submit"
                  content="Submit"
                />
                <Button
                  onClick={() => history.push("/tickets")}
                  disabled={loading}
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
