import pg from "pg"

export const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "RecipeApp",
    password: "12345678",
    port: "5432"
});

export default db;