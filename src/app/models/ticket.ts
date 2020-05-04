export interface ITicket {
  id: string;
  title: string;
  description: string;
  priority: string;
  category: string;
  dateFirst: Date;
  dateModified: Date;
  dateDeadline: Date;
}

export interface ITicketFormValues extends Partial<ITicket> {
  time?: Date;
}
