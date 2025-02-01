import dotenv from 'dotenv';

dotenv.config();

if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return;
}

export const CLIENT_ID: string = process.env.CLIENT_ID;
export const CLIENT_SECRET: string = process.env.CLIENT_SECRET;
