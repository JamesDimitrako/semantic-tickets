import React, { SyntheticEvent, useContext } from "react";
import { Grid } from "semantic-ui-react";
import { ITicket } from "../../../app/models/ticket";
import TicketList from "./TicketList";
import TicketDetails from "../details/TicketDetails";
import TicketForm from "../form/TicketForm";
import { observer } from "mobx-react-lite";
import TicketStore from "../../../app/stores/ticketStore";

interface IProps {
  tickets: ITicket[];
  setEditMode: (editMode: boolean) => void;
  setSelectedActivity: (activity: ITicket | null) => void;
  editTicket: (ticket: ITicket) => void;
  deleteTicket: (e: SyntheticEvent<HTMLButtonElement>, id: string) => void;
  submitting: boolean;
  target: string;
}

const TicketDashboard: React.FC<IProps> = ({
  setEditMode,
  editTicket,
  deleteTicket,
  submitting,
  target,
  setSelectedActivity,
}) => {
  const ticketStore = useContext(TicketStore);
  const { editMode, selectedTicket } = ticketStore;
  return (
    <Grid>
      <Grid.Column width={10}>
        <TicketList
          deleteTicket={deleteTicket}
          submitting={submitting}
          target={target}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedTicket && !editMode && (
          <TicketDetails
            setEditMode={setEditMode}
            setSelectedActivity={setSelectedActivity}
          />
        )}
        {editMode && (
          <TicketForm
            key={(selectedTicket && selectedTicket.id) || 0}
            setEditMode={setEditMode}
            ticket={selectedTicket!}
            editTicket={editTicket}
            submitting={submitting}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default observer(TicketDashboard);
