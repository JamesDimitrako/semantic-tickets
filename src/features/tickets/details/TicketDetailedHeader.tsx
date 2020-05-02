import React from "react";
import { Segment, Item, Header, Button, Image } from "semantic-ui-react";
import { ITicket } from "../../../app/models/ticket";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

const ticketImageStyle = {
  filter: "brightness(30%)",
};

const ticketImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};

const manageTicketStyle = {
  background: "#ff867c",
  color: "white",
};

const TicketDetailedHeader: React.FC<{ ticket: ITicket }> = ({ ticket }) => {
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image src={`/assets/placeholder.png`} fluid style={ticketImageStyle} />
        <Segment basic style={ticketImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={ticket.title}
                  style={{ color: "white" }}
                />
                <p>{ticket.dateFirst}</p>
                <p>
                  Hosted by <strong>Bob</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        <Button color="teal">Join Ticket</Button>
        <Button>Cancel attendance</Button>
        <Button
          as={Link}
          to={`/manage/${ticket.id}`}
          style={manageTicketStyle}
          floated="right"
        >
          Manage Ticket
        </Button>
      </Segment>
    </Segment.Group>
  );
};

export default observer(TicketDetailedHeader);
