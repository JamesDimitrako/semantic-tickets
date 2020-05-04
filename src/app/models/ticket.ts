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

export class TicketFormValues implements ITicketFormValues {
  id?: string = undefined;
  title: string = "";
  description: string = "";
  priority: string = "";
  category: string = "";
  dateFirst?: Date = undefined;
  time?: Date = undefined;
  dateModified?: Date = undefined;
  dateDeadline?: Date = undefined;

  constructor(init?: ITicketFormValues) {
    if (init && init.dateDeadline) {
      init.time = init.dateDeadline;
    }

    Object.assign(this, init);
  }
}
