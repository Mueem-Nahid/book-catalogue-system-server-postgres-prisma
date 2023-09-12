import validateRequest from '../../middlewares/validateRequest';
import express from 'express';
import {BookController} from './book.controller';
import {BookValidation} from './book.validation';
import auth from '../../middlewares/auth';
import {ENUM_USER_ROLE} from '../../../enums/user';
// import { ReviewController } from '../review/review.controller';

const router = express.Router();

router.post(
  '/create-book',
  validateRequest(BookValidation.createBookZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.createBook
);

// router.post(
//   '/:bookId/reviews',
//   auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.ADMIN),
//   ReviewController.createReview
// );

router.get('/:id', BookController.getABook);

router.patch('/:id',
   validateRequest(BookValidation.updateBookZodSchema),
   auth(ENUM_USER_ROLE.ADMIN),
   BookController.updateBook);

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), BookController.deleteBook);

router.get('/', BookController.getAllBooks);

export const BookRoutes = router;
