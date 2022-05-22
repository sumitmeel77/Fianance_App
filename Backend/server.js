const app = require("./app")

const server = app.listen(
    4000,
    () => {
        console.log(`successfully started on port 4000`)
    }
)