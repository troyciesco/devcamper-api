const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
//const logger = require("./middleware/logger")
const morgan = require("morgan")
// Route files
const bootcamps = require("./routes/bootcamps")

// Load env vars
dotenv.config({ path: "./config/config.env" })

// Connect to database
connectDB()

const app = express()

//app.use(logger)

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"))
}

// Mount routers
app.use("/api/v1/bootcamps", bootcamps)

const port = process.env.PORT || 5000

const server = app.listen(
	port,
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
)

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
	console.log(`Error: ${err.message}`)
	// Close server & exit process
	server.close(() => {
		process.exit(1)
	})
})
