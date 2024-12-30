import bcrypt from 'bcrypt';
import User from '../models/user';
import { generateToken } from '../utility/utils';

export const loginService = async (email: string, password: string) => {

  // Find user by email
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error('User not found');
  }

  // Check if the password is correct
  const isMatch = await bcrypt.compare(password, user.password);
  console.log(password, user.password,"isMatch :",isMatch);
  if (!isMatch) {
    throw new Error('Invalid password');
  }

  // Generate JWT token
  const token = generateToken(user.id);
  return { token };
};
