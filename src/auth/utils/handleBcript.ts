import { compare, genSalt, hash } from 'bcrypt';

const saltOrRounds = 10;

export const generateHash = async (password: string): Promise<string> => {
  const salt = await genSalt(saltOrRounds);
  return await hash(password, salt);
};

export const compareHash = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return await compare(password, hash);
};
