import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { OrderValidation } from './order.validation';
import { OrderController } from './order.controller';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/create-order',
  validateRequest(OrderValidation.orderSchema),
  auth(ENUM_USER_ROLE.CUSTOMER),
  OrderController.createOrder
);

router.get('/', auth(ENUM_USER_ROLE.ADMIN), OrderController.getAllOrders);

export const OrderRoutes = router;
