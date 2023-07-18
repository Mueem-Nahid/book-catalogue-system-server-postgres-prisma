import { model, Schema } from 'mongoose';
import { AdminModel, IAdmin } from './admin.interface';
import { hashPassword } from '../../../helpers/hashPassword';

const adminSchema = new Schema<IAdmin>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// instance method
adminSchema.methods.isExist = async function (
  phoneNumber: string
): Promise<Pick<IAdmin, '_id' | 'password' | 'email'> | null> {
  return Admin.findOne(
    { phoneNumber },
    { _id: 1, password: 1, email: 1 }
  ).lean();
};

adminSchema.methods.isPasswordMatched = async function (
  enteredPassword: string,
  savedPassword: string
): Promise<boolean> {
  return hashPassword.decryptPassword(enteredPassword, savedPassword);
};

// hash password using pre hook middleware (fat model thin controller)
// User.create() / user.save()
adminSchema.pre('save', async function (next) {
  this.password = await hashPassword.encryptPassword(this.password);
  next();
});

export const Admin: AdminModel = model<IAdmin, AdminModel>(
  'Admin',
  adminSchema
);
