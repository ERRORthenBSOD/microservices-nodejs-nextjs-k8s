import { Publisher, Subjects, OrderCreatedEvent } from '@atmosphericb/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
