import React from "react";
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
}

export const TicketDashboard: React.FC<IProps> = ({
  tickets,
  selectTicket,
  selectedTicket,
  editMode,
  setEditMode,
  setSelectedTicket,
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <TicketList tickets={tickets} selectTicket={selectTicket} />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedTicket && !editMode && (
          <TicketDetails
            ticket={selectedTicket}
            setEditMode={setEditMode}
            setSelectedTicket={setSelectedTicket}
          />
        )}
        {editMode && <TicketForm setEditMode={setEditMode} />}
      </Grid.Column>
    </Grid>
  );
};
