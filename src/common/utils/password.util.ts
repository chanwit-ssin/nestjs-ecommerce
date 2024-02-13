import * as bcrypt from 'bcrypt';

// password or pin
export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const comparePassword = async (
  password: string,
  checkPassword: string,
) => {
  return await bcrypt.compare(password, checkPassword);
};
