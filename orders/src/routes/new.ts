import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest, OrderStatus } from '@atmosphericb/common';
import { Ticket } from '../models/ticket';
import { Order } from '../models/order';
import { OrderCreatedPublisher } from '../events/publishers/order-created-publisher';
import { natsWrapper } from '../nats-wrapper';
import { NotFoundError, BadRequestError } from '@atmosphericb/common';
const router = express.Router();

const EXPIRATION_WINDOW_SECONDS = 15 * 60;

router.post(
  '/api/orders',
  [body('ticketId').not().isEmpty().withMessage('Ticket id is required')],
  validateRequest,
  async (req: Request, res: Response) => {
    const { ticketId } = req.body;
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      throw new NotFoundError();
    }
    const isReserved = await ticket.isReserved();
    if (isReserved) {
      throw new BadRequestError('Ticket is already reserved');
    }

    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + 15 * 60);

    const order = Order.build({
      userId: req.currentUser!.id,
      ticket,
      status: OrderStatus.Created,
      expiresAt: expiration,
    });
    await order.save();
    new OrderCreatedPublisher(natsWrapper.client).publish({
      id: order.id,
      userId: order.userId,
      version: order.version,
      ticket: {
        id: ticket.id,
        price: ticket.price,
      },
      status: order.status,
      expiresAt: order.expiresAt.toISOString(),
    });
    res.status(201).send(order);
  }
);

export { router as createOrderRouter };
