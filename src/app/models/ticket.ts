export interface ITicket {
  id: string;
  title: string;
  description: string;
  priority: string;
  category: string;
  dateFirst: Date | null;
  dateModified: Date | null;
  dateDeadline: Date | null;
}
