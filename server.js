const express = require("express")
const dotenv = require("dotenv")
// Route files
const bootcamps = require("./routes/bootcamps")
//const logger = require("./middleware/logger")
const morgan = require("morgan")

// Load env vars
dotenv.config({ path: "./config/config.env" })

const app = express()

//app.use(logger)

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"))
}

// Mount routers
app.use("/api/v1/bootcamps", bootcamps)

const port = process.env.PORT || 5000

app.listen(port, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`))
