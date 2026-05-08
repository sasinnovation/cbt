export const ENV = {
  mode: process.env.NODE_ENV || 'development',

  isProduction: process.env.NODE_ENV === 'production',
  isStaging: process.env.NODE_ENV === 'staging',
  isDevelopment: process.env.NODE_ENV === 'development'
}
