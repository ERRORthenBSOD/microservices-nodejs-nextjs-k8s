import { Publisher, Subjects, TicketUpdatedEvent } from '@atmosphericb/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
