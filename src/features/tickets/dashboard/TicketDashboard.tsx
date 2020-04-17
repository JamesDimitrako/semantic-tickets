import React, { SyntheticEvent } from "react";
import { Grid } from "semantic-ui-react";
import { ITicket } from "../../../app/models/ticket";
import TicketList from "./TicketList";
import TicketDetails from "../details/TicketDetails";
import TicketForm from "../form/TicketForm";

interface IProps {
  tickets: ITicket[];
  selectTicket: (id: string) => void;
  selectedTicket: ITicket | null;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  setSelectedTicket: (ticket: ITicket | null) => void;
  createTicket: (ticket: ITicket) => void;
  editTicket: (ticket: ITicket) => void;
  deleteTicket: (e: SyntheticEvent<HTMLButtonElement>, id: string) => void;
  submitting: boolean;
  target: string;
}

export const TicketDashboard: React.FC<IProps> = ({
  tickets,
  selectTicket,
  selectedTicket,
  editMode,
  setEditMode,
  setSelectedTicket,
  createTicket,
  editTicket,
  deleteTicket,
  submitting,
  target,
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <TicketList
          tickets={tickets}
          selectTicket={selectTicket}
          deleteTicket={deleteTicket}
          submitting={submitting}
          target={target}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedTicket && !editMode && (
          <TicketDetails
            ticket={selectedTicket}
            setEditMode={setEditMode}
            setSelectedTicket={setSelectedTicket}
          />
        )}
        {editMode && (
          <TicketForm
            key={(selectedTicket && selectedTicket.id) || 0}
            setEditMode={setEditMode}
            ticket={selectedTicket!}
            createTicket={createTicket}
            editTicket={editTicket}
            submitting={submitting}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};
