import { Publisher, Subjects, OrderCancelledEvent } from '@atmosphericb/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
