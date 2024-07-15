import mongoose, { Schema, Model } from 'mongoose';

type UserDocument = Document & {
  username: string;
  age: Number;
};

type UserInput = {
  username: UserDocument['username'];
  age: UserDocument['age'];
};
const userSchema = new Schema(
  {
    username: { type: Schema.Types.String, required: true, unique: true },
    age: { type: Schema.Types.Number, required: true, min: 1 },
  },
  {
    collection: 'users',
    timestamps: true,
  }
);

const User: Model<UserDocument> = mongoose.model<UserDocument>(
  'User',
  userSchema
);

export default User;
export { UserDocument, UserInput };
