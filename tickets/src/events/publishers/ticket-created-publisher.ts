import { Publisher, Subjects, TicketCreatedEvent } from '@atmosphericb/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}