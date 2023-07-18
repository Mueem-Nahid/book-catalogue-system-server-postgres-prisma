import validateRequest from '../../middlewares/validateRequest';
import express from 'express';
import { BookController } from './book.controller';
import { BookValidation } from './book.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
  '/',
  validateRequest(BookValidation.createBookZodSchema),
  auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.ADMIN),
  BookController.createBook
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.ADMIN),
  BookController.getABook
);

router.patch('/:id', auth(ENUM_USER_ROLE.SELLER), BookController.updateBook);

router.delete('/:id', auth(ENUM_USER_ROLE.SELLER), BookController.deleteBook);

router.get(
  '/',
  auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.ADMIN),
  BookController.getAllBooks
);

export const BookRoutes = router;
