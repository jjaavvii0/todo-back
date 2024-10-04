import { Pool, Client } from "pg";

interface PostgreSQLError extends Error {
    code?: string;
}
const dbName = "todo_project_db";

const clientConfig = {
    user: process.env.USER_POSTGRESQL,
    host: process.env.HOST_POSTGRESQL,
    password: process.env.PASSWORD_POSTGRESQL,
    port: 5432,
};

const poolConfig = {
    ...clientConfig,
    database: dbName,
};

const client = new Client(clientConfig);
export const pool = new Pool(poolConfig);

const createDatabase = async () => {
    try {
        await client.connect();
        await client.query(`CREATE DATABASE ${dbName}`);
        console.log(`DB ${dbName} CREATED`);
    } catch (error) {
        const pgError = error as PostgreSQLError;
        if (pgError.code === "42P04") {// Code to "DB EXISTS"
            console.log(`DB ${dbName} EXISTS`);
        } else {
            console.error("Error creating the DB:", error);
        }
    } finally {
        await client.end();
    }
};

const checkTableExists = async () => {
    const queryText = `
        SELECT EXISTS (
            SELECT FROM 
                pg_tables
            WHERE 
                schemaname = 'public' AND 
                tablename  = 'duties'
        );
    `;
    const res = await pool.query(queryText);
    return res.rows[0].exists;
};

const createTable = async () => {
    const exists = await checkTableExists();
    if (!exists) {
        const queryText = `
            CREATE TABLE duties (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT,
                status BOOLEAN NOT NULL
            );
        `;
        await pool.query(queryText);
        console.log(`TABLE 'duties' CREATED`);
    } else {
        console.log(`TABLE 'duties' EXISTS`);
    }
};


export const initDatabase = async () => {
    await createDatabase();
    await createTable();
};

initDatabase().then(() => {
    console.log("---------------------------------------");
    console.log(`Connected to POSTGRESQL DB: ${dbName}`);
    console.log("---------------------------------------");
});
