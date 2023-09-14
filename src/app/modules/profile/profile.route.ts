import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import express, { Router } from 'express';
import { ProfileController } from './profile.controller';

const router: Router = express.Router();

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  ProfileController.getUserProfile
);

export const ProfileRoutes = router;
