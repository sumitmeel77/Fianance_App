const app = require("./app")
const connectDatabase = require("./database/database")

//importing env file
// const dotenv = require("dotenv")
// dotenv.config({ path: "Backend/config/config.env" })

process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
});

connectDatabase()

app.listen(
    4000,
    () => {
        console.log(`successfully started on port 4000`)
    }
)