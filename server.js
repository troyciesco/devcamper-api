const path = require("path")
const express = require("express")
const dotenv = require("dotenv")
const colors = require("colors")
const fileupload = require("express-fileupload")
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
//const logger = require("./middleware/logger")
const connectDB = require("./config/db")
// Route files
// Load env vars
dotenv.config({ path: "./config/config.env" })
const bootcamps = require("./routes/bootcamps")
const courses = require("./routes/courses")
const auth = require("./routes/auth")
const users = require("./routes/users")
const errorHandler = require("./middleware/error")

// Connect to database
connectDB()

const app = express()

// Body parser
app.use(express.json())

// Cookie parser
app.use(cookieParser())

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"))
}

// File uploading
app.use(fileupload())

// Set static folder
app.use(express.static(path.join(__dirname, "public")))

// Mount routers
app.use("/api/v1/bootcamps", bootcamps)
app.use("/api/v1/courses", courses)
app.use("/api/v1/auth", auth)
app.use("/api/v1/users", users)

// Middleware is processed in order, so this error handler has to be after the mounted routers
app.use(errorHandler)

const port = process.env.PORT || 5000

const server = app.listen(
	port,
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`.yellow.bold)
)

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
	console.log(`Error: ${err.message}`.black.bgRed)
	// Close server & exit process
	server.close(() => {
		process.exit(1)
	})
})
