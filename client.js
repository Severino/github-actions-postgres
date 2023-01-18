import pgPromise from "pg-promise"
import * as dotenv from "dotenv"
dotenv.config()

const pgp = pgPromise()

console.log(process.env.DB_HOST, process.env.DB_PORT, process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD)


let database = pgp({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
})

await database.none("DROP TABLE IF EXISTS test");
await database.none("CREATE TABLE IF NOT EXISTS test ( name text )");
await database.none("INSERT INTO test (name) VALUES ('albert'), ('bob'), ('camillo'), ('dietmar')");
const result = await database.manyOrNone("SELECT name FROM test");
console.log(result.map(res => res.name).join(", "))