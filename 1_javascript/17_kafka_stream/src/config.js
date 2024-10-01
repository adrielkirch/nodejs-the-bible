module.exports = {
  PORT: process.env.PORT || 3000,
  SALT: process.env.SALT || 'mysecretsalt',
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'mysecretjwt',
};
