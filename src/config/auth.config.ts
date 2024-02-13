import { registerAs } from '@nestjs/config';

export type AuthConfig = {
  jwtSecret: string;
  jwtExpiresIn: string;
};
export default registerAs(
  'auth',
  () =>
    ({
      jwtSecret: process.env.JWT_SECRET,
      jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
    }) as AuthConfig,
);
