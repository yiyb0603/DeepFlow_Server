import 'dotenv/config';

export default (name: string) => {
  const value: string = process.env[name];
  if (!value) {
    console.log('존재하지 않는 환경변수.');
    return;
  }
  return value;
}