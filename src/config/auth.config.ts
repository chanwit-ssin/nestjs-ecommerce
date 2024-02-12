export const jwtConstants = {
  secret: 'secret',
};

export const jwtConfig = {
  global: true,
  secret: jwtConstants.secret,
  signOptions: { expiresIn: '30d' },
};
