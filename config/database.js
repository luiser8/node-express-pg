import pg from 'pg';
import dotenv from 'dotenv';

    dotenv.config();
    const pg_host = process.env.NODE_ENV === "development" ? process.env.PG_HOST : process.env.PG_HOST;

        const database = new pg.Client({
          host: pg_host,
          port: process.env.PG_PORT,
          user: process.env.PG_USER,
          password: process.env.PG_PASSWORD,
          database: process.env.PG_DATABASE,
        });
        database.connect();

export default database;