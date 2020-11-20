module.exports = {
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: `${process.env.DB_DATABASE}_test`,
    host: process.env.DB_HOST,
    dialect: 'postgres'
  },
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: 'postgres'
  },
  staging: {
    username: process.env['db_postgres_db_user'],
    password: process.env['db_postgres_db_password'],
    database: process.env['db_postgres_db_name'],
    host: process.env['db_postgres_db_host'],
    port: process.env['db_postgres_db_port'],
    use_env_variable: false,
    dialect: 'postgres',
    dialectOptions: {
      useUTC: false
    },
    timezone: '-05:00'
  },
  production: {
    username: process.env['db_postgres_db_user'],
    password: process.env['db_postgres_db_password'],
    database: process.env['db_postgres_db_name'],
    host: process.env['db_postgres_db_host'],
    port: process.env['db_postgres_db_port'],
    use_env_variable: false,
    dialect: 'postgres',
    dialectOptions: {
      useUTC: false
    },
    timezone: '-05:00',
    logging: true
  }
}
