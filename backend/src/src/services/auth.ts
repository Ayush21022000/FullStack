import User from '../models/user';
import { generateToken } from '../utility/utils';
export const loginService = async (email: string, hashedPassword: string) => {

  // Find user by email
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error('User not found');
  }
  // Check if the password is correct
  if (user.password !== hashedPassword) {
    throw new Error('Invalid credentials');
  }

  // Generate JWT token
  const token = generateToken(user.id);
  return { token };
};
