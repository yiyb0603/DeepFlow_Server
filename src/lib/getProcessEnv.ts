import 'dotenv/config';

export default (name: string) => {
  const value: string = process.env[name];
  return value;
}